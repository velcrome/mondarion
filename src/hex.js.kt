import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import kotlin.js.Math
import kotlin.js.Math.sqrt

/**
 * Created by synopia on 3/24/2017.
 */

data class Hex(val q: Int, val r: Int, val s: Int = -q - r) {
    operator fun plus(other: Hex): Hex {
        return Hex(q + other.q, r + other.r, s + other.s)
    }

    operator fun minus(other: Hex): Hex {
        return Hex(q - other.q, r - other.r, s - other.s)
    }

    operator fun times(k: Int): Hex {
        return Hex(q * k, r * k, s * k)
    }

    fun neighbor(k: Int): Hex {
        return this + directions[k % 6]
    }

    companion object {
        val directions = arrayOf(Hex(1, 0, -1), Hex(1, -1, 0), Hex(0, -1, 1), Hex(-1, 0, 1), Hex(-1, 1, 0), Hex(0, 1, -1))
    }
}

data class FractionalHex(val q: Double, val r: Double, val s: Double = -q - r) {
    operator fun plus(other: FractionalHex): FractionalHex {
        return FractionalHex(q + other.q, r + other.r, s + other.s)
    }

    operator fun minus(other: FractionalHex): FractionalHex {
        return FractionalHex(q - other.q, r - other.r, s - other.s)
    }

    operator fun times(k: Double): FractionalHex {
        return FractionalHex(q * k, r * k, s * k)
    }

    fun round(): Hex {
        val qq = Math.round(q)
        val rr = Math.round(r)
        val ss = Math.round(s)
        val qDiff = Math.abs(qq - q)
        val rDiff = Math.abs(rr - r)
        val sDiff = Math.abs(ss - s)
        if (qDiff > rDiff && qDiff > sDiff) {
            return Hex(-rr - ss, rr, ss)
        } else if (rDiff > sDiff) {
            return Hex(qq, -qq - ss, ss)
        } else {
            return Hex(qq, rr)
        }
    }
}

data class Orientation(val f0: Double, val f1: Double, val f2: Double, val f3: Double,
                       val b0: Double, val b1: Double, val b2: Double, val b3: Double, val startAngle: Double) {
    companion object {
        val pointy = Orientation(sqrt(3.0), sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5)
        val flat = Orientation(3.0 / 2.0, 0.0, sqrt(3.0) / 2.0, sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, sqrt(3.0) / 3.0, 0.0)
    }
}

data class Point(val x: Double, val y: Double) {
    operator fun plus(p: Point): Point {
        return Point(p.x + x, p.y + y)
    }

    operator fun times(k: Double): Point {
        return Point(x * k, y * k)
    }
}

data class Layout(val orientation: Orientation, val size: Point, val origin: Point) {
    fun hexToPixel(hex: Hex): Point {
        val M = orientation
        val x = (M.f0 * hex.q + M.f1 * hex.r) * size.x
        val y = (M.f2 * hex.q + M.f3 * hex.r) * size.y
        return Point(x + origin.x, y + origin.y)
    }

    fun pixelToHex(p: Point): FractionalHex {
        val M = orientation
        val pt = Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y)
        val q = M.b0 * pt.x + M.b1 * pt.y
        val r = M.b2 * pt.x + M.b3 * pt.y
        return FractionalHex(q, r)
    }

    fun cornerOffset(corner: Int): Point {
        val angle = 2.0 * Math.PI * (orientation.startAngle + corner) / 6.0
        return Point(size.x * Math.cos(angle), size.y * Math.sin(angle))
    }

    fun corners(h: Hex): List<Point> {
        val center = hexToPixel(h)
        return (0..5).map {
            cornerOffset(it) + center
        }
    }
}

data class Tile(val id: String, val image: HTMLImageElement) {
}

data class Triangle(var tile: Tile?)

class HexTile() {
    val tris = Array(6, { Triangle(null) })
}

class HexGrid(val layout: Layout) {
    var map = mutableMapOf<Hex, HexTile>()
    var highlight: FractionalHex? = null
    var highlightIndex: Int? = null
    var mx: Double = 0.0
    var my: Double = 0.0
    fun load(lines: List<String>, tiles: List<Tile>) {
        lines.forEach {
            val regex = Regex("\\(([\\-0-9]+), ([\\-0-9]+)\\) = \\[ ([0-9A-Za-z_]+),([0-9A-Za-z_]+),([0-9A-Za-z_]+),([0-9A-Za-z_]+),([0-9A-Za-z_]+),([0-9A-Za-z_]+) \\]")
            val r = regex.matchEntire(it)
            if (r != null) {
                val hex = Hex(r.groupValues[1].toInt(), r.groupValues[2].toInt())
                map[hex]!!.tris.forEachIndexed { i, tri ->
                    val id = r.groupValues[i + 3]
                    tri.tile = tiles.find { it.id == id }
                }
            }
        }
    }

    fun save(): String {
        var result = ""
        map.forEach { (hex, tile) ->
            if (tile.tris.any { it.tile != null }) {
                result += "(${hex.q}, ${hex.r}) = [ "
                result += tile.tris.joinToString(",") {
                    it.tile?.id ?: "null"
                }
                result += " ]\n"
            }
        }
        return result
    }

    fun setTile(tile: Tile) {
        if (highlightIndex != null && highlight != null) {
            map[highlight!!.round()]?.tris?.get(highlightIndex!!)?.tile = tile
        }
    }

    fun fill(radius: Int) {
        (-radius..radius).forEach { q ->
            val r1 = Math.max(-radius, -q - radius)
            val r2 = Math.min(radius, -q + radius)
            (r1..r2).forEach { r ->
                val hex = Hex(q, r)
                val tile = HexTile()
                map[hex] = tile
            }
        }
    }

    fun drawContour(context: CanvasRenderingContext2D, hex: Hex) {
        val corners = layout.corners(hex)
        val start = corners[0]
        context.moveTo(start.x, start.y)
        corners.forEach { p ->
            context.lineTo(p.x, p.y)
        }
        context.lineTo(start.x, start.y)
    }

    fun drawTriContour(context: CanvasRenderingContext2D, hex: Hex, type: Int) {
        val center = layout.hexToPixel(hex)
        val corners = layout.corners(hex)
        context.moveTo(center.x, center.y)
        context.lineTo(corners[type].x, corners[type].y)
        context.lineTo(corners[(type + 5) % 6].x, corners[(type + 5) % 6].y)
        context.lineTo(center.x, center.y)
    }

    fun drawTriImage(context: CanvasRenderingContext2D, hex: Hex, type: Int, img: HTMLImageElement) {
        val center = layout.hexToPixel(hex)
        val angle = 2.0 * Math.PI * (layout.orientation.startAngle + type - 2) / 6.0
        val h = layout.size.y * Math.cos(30.0 / 180.0 * Math.PI)
        context.save()
        context.translate(center.x, center.y)
        context.rotate(angle)
        context.drawImage(img, -layout.size.x / 2.0, 0.0, layout.size.x, h)
        context.restore()
    }

    fun drawGrid(context: CanvasRenderingContext2D) {
        context.save()

        context.beginPath()
        map.forEach { (hex, tile) ->
            drawContour(context, hex)
            tile.tris.forEachIndexed({ i, tri ->
                if (tri.tile != null) {
                    val image = tri.tile!!.image
                    drawTriImage(context, hex, i, image)
                }
            })
        }
        context.strokeStyle = "#119"
        context.stroke()

        highlight = layout.pixelToHex(Point(mx, my))
        if (highlight != null) {
            val hex = highlight!!.round()
            context.beginPath()
            val corners = layout.corners(hex)
            val start = corners[0]
            val center = layout.hexToPixel(hex)

            context.moveTo(start.x, start.y)
            var last = false
            var hl = 0
            corners.forEachIndexed { i, p ->
                context.lineTo(p.x, p.y)
                val side = ((p.x - center.x) * (my - center.y) - (p.y - center.y) * (mx - center.x)) > 0
                if (i > 0) {
                    if (last && !side) {
                        hl = i
                    }
                }
                last = side
            }
            highlightIndex = hl
            context.lineTo(start.x, start.y)
            context.strokeStyle = "#191"
            context.stroke()
            context.beginPath()
            drawTriContour(context, hex, hl)
            context.strokeStyle = "#FFF"
            context.stroke()

            highlight
        }
        context.restore()
    }
}