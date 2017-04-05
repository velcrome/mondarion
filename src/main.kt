import jquery.jq
import org.w3c.dom.*
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document
import kotlin.browser.window

/**
 * Created by synopia on 3/23/2017.
 */
fun getImage(path: String): HTMLImageElement {
    val image = window.document.createElement("img") as HTMLImageElement
    image.src = path
    image.width = 100
    return image
}

fun tile(name: String): Tile {
    return Tile(name, getImage("tile_$name.png"))
}

class MondarionCanvas {
    val canvas = document.getElementById("canvas") as HTMLCanvasElement
    val context = canvas.getContext("2d") as CanvasRenderingContext2D
    val palette = document.getElementById("palette") as HTMLFieldSetElement
    val save = document.getElementById("save") as HTMLTextAreaElement
    val apply = document.getElementById("apply") as HTMLButtonElement
    val grid = HexGrid(Layout(Orientation.flat, Point(75.0, 75.0), Point(canvas.width / 2.0, canvas.height / 2.0)))
    val tiles = listOf(tile("flat"),
            tile("up"), 
            tile("down"), 
            tile("leftup"), tile("rightup"), // flip sides of the same half up-chip
            tile("leftdown"), tile("rightdown") // flip sides of the same half down-chip
    )
    var selected: Tile? = null

    init {
        grid.fill(3)

        tiles.forEachIndexed { i, tile ->
            val node = document.createElement("input") as HTMLInputElement
            node.type = "radio"
            node.id = "tile$i"
            node.name = "Palette"
            node.onclick = {
                selected = tile
                0
            }
            val label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = node.id
            label.appendChild(tile.image)
            palette.appendChild(node)
            palette.appendChild(label)
        }

    }

    fun draw() {
        context.save()
        context.fillStyle = "#999"
        context.fillRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
        grid.drawGrid(context)
        context.restore()
    }

    fun start() {
        canvas.onmousemove = { evt ->
            val rect = canvas.getBoundingClientRect()
            val x = (evt as MouseEvent).clientX - rect.left
            val y = (evt as MouseEvent).clientY - rect.top
            grid.mx = x
            grid.my = y
            0
        }
        canvas.onmousedown = { evt ->
            if (selected != null) {
                grid.setTile(selected!!)
                save.value = grid.save()
            }
            0
        }
        apply.onclick = { evt ->
            val lines = save.value.split("\n")
            grid.load(lines, tiles)
            0
        }
        window.setInterval({ draw() }, 1000 / 30)
    }
}

fun main(args: Array<String>) {
    jq {
        MondarionCanvas().start()
    }
}