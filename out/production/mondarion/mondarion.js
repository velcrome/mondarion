if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'mondarion'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'mondarion'.");
}
var mondarion = function (_, Kotlin) {
  'use strict';
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var Regex = Kotlin.kotlin.text.Regex_61zpoe$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var joinToString = Kotlin.kotlin.collections.joinToString_cgipc5$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  function Hex(q, r, s) {
    Hex$Companion_getInstance();
    if (s === void 0)
      s = -q - r | 0;
    this.q = q;
    this.r = r;
    this.s = s;
  }
  Hex.prototype.plus_1jwb$ = function (other) {
    return new Hex(this.q + other.q | 0, this.r + other.r | 0, this.s + other.s | 0);
  };
  Hex.prototype.minus_1jwb$ = function (other) {
    return new Hex(this.q - other.q | 0, this.r - other.r | 0, this.s - other.s | 0);
  };
  Hex.prototype.times_za3lpa$ = function (k) {
    return new Hex(Kotlin.imul(this.q, k), Kotlin.imul(this.r, k), Kotlin.imul(this.s, k));
  };
  Hex.prototype.neighbor_za3lpa$ = function (k) {
    return this.plus_1jwb$(Hex$Companion_getInstance().directions[k % 6]);
  };
  function Hex$Companion() {
    Hex$Companion_instance = this;
    this.directions = [new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1), new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)];
  }
  Hex$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Hex$Companion_instance = null;
  function Hex$Companion_getInstance() {
    if (Hex$Companion_instance === null) {
      new Hex$Companion();
    }
    return Hex$Companion_instance;
  }
  Hex.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Hex',
    interfaces: []
  };
  Hex.prototype.component1 = function () {
    return this.q;
  };
  Hex.prototype.component2 = function () {
    return this.r;
  };
  Hex.prototype.component3 = function () {
    return this.s;
  };
  Hex.prototype.copy_qt1dr2$ = function (q, r, s) {
    return new Hex(q === void 0 ? this.q : q, r === void 0 ? this.r : r, s === void 0 ? this.s : s);
  };
  Hex.prototype.toString = function () {
    return 'Hex(q=' + Kotlin.toString(this.q) + (', r=' + Kotlin.toString(this.r)) + (', s=' + Kotlin.toString(this.s)) + ')';
  };
  Hex.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.q) | 0;
    result = result * 31 + Kotlin.hashCode(this.r) | 0;
    result = result * 31 + Kotlin.hashCode(this.s) | 0;
    return result;
  };
  Hex.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.q, other.q) && Kotlin.equals(this.r, other.r) && Kotlin.equals(this.s, other.s)))));
  };
  function FractionalHex(q, r, s) {
    if (s === void 0)
      s = -q - r;
    this.q = q;
    this.r = r;
    this.s = s;
  }
  FractionalHex.prototype.plus_y8k5q$ = function (other) {
    return new FractionalHex(this.q + other.q, this.r + other.r, this.s + other.s);
  };
  FractionalHex.prototype.minus_y8k5q$ = function (other) {
    return new FractionalHex(this.q - other.q, this.r - other.r, this.s - other.s);
  };
  FractionalHex.prototype.times_14dthe$ = function (k) {
    return new FractionalHex(this.q * k, this.r * k, this.s * k);
  };
  FractionalHex.prototype.round = function () {
    var qq = Math.round(this.q);
    var rr = Math.round(this.r);
    var ss = Math.round(this.s);
    var qDiff = Math.abs(qq - this.q);
    var rDiff = Math.abs(rr - this.r);
    var sDiff = Math.abs(ss - this.s);
    if (qDiff > rDiff && qDiff > sDiff) {
      return new Hex(-rr - ss | 0, rr, ss);
    }
     else if (rDiff > sDiff) {
      return new Hex(qq, -qq - ss | 0, ss);
    }
     else {
      return new Hex(qq, rr);
    }
  };
  FractionalHex.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'FractionalHex',
    interfaces: []
  };
  FractionalHex.prototype.component1 = function () {
    return this.q;
  };
  FractionalHex.prototype.component2 = function () {
    return this.r;
  };
  FractionalHex.prototype.component3 = function () {
    return this.s;
  };
  FractionalHex.prototype.copy_yvo9jy$ = function (q, r, s) {
    return new FractionalHex(q === void 0 ? this.q : q, r === void 0 ? this.r : r, s === void 0 ? this.s : s);
  };
  FractionalHex.prototype.toString = function () {
    return 'FractionalHex(q=' + Kotlin.toString(this.q) + (', r=' + Kotlin.toString(this.r)) + (', s=' + Kotlin.toString(this.s)) + ')';
  };
  FractionalHex.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.q) | 0;
    result = result * 31 + Kotlin.hashCode(this.r) | 0;
    result = result * 31 + Kotlin.hashCode(this.s) | 0;
    return result;
  };
  FractionalHex.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.q, other.q) && Kotlin.equals(this.r, other.r) && Kotlin.equals(this.s, other.s)))));
  };
  function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
    Orientation$Companion_getInstance();
    this.f0 = f0;
    this.f1 = f1;
    this.f2 = f2;
    this.f3 = f3;
    this.b0 = b0;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.startAngle = startAngle;
  }
  function Orientation$Companion() {
    Orientation$Companion_instance = this;
    this.pointy = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
    this.flat = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
  }
  Orientation$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Orientation$Companion_instance = null;
  function Orientation$Companion_getInstance() {
    if (Orientation$Companion_instance === null) {
      new Orientation$Companion();
    }
    return Orientation$Companion_instance;
  }
  Orientation.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Orientation',
    interfaces: []
  };
  Orientation.prototype.component1 = function () {
    return this.f0;
  };
  Orientation.prototype.component2 = function () {
    return this.f1;
  };
  Orientation.prototype.component3 = function () {
    return this.f2;
  };
  Orientation.prototype.component4 = function () {
    return this.f3;
  };
  Orientation.prototype.component5 = function () {
    return this.b0;
  };
  Orientation.prototype.component6 = function () {
    return this.b1;
  };
  Orientation.prototype.component7 = function () {
    return this.b2;
  };
  Orientation.prototype.component8 = function () {
    return this.b3;
  };
  Orientation.prototype.component9 = function () {
    return this.startAngle;
  };
  Orientation.prototype.copy_g0y5u6$ = function (f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
    return new Orientation(f0 === void 0 ? this.f0 : f0, f1 === void 0 ? this.f1 : f1, f2 === void 0 ? this.f2 : f2, f3 === void 0 ? this.f3 : f3, b0 === void 0 ? this.b0 : b0, b1 === void 0 ? this.b1 : b1, b2 === void 0 ? this.b2 : b2, b3 === void 0 ? this.b3 : b3, startAngle === void 0 ? this.startAngle : startAngle);
  };
  Orientation.prototype.toString = function () {
    return 'Orientation(f0=' + Kotlin.toString(this.f0) + (', f1=' + Kotlin.toString(this.f1)) + (', f2=' + Kotlin.toString(this.f2)) + (', f3=' + Kotlin.toString(this.f3)) + (', b0=' + Kotlin.toString(this.b0)) + (', b1=' + Kotlin.toString(this.b1)) + (', b2=' + Kotlin.toString(this.b2)) + (', b3=' + Kotlin.toString(this.b3)) + (', startAngle=' + Kotlin.toString(this.startAngle)) + ')';
  };
  Orientation.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.f0) | 0;
    result = result * 31 + Kotlin.hashCode(this.f1) | 0;
    result = result * 31 + Kotlin.hashCode(this.f2) | 0;
    result = result * 31 + Kotlin.hashCode(this.f3) | 0;
    result = result * 31 + Kotlin.hashCode(this.b0) | 0;
    result = result * 31 + Kotlin.hashCode(this.b1) | 0;
    result = result * 31 + Kotlin.hashCode(this.b2) | 0;
    result = result * 31 + Kotlin.hashCode(this.b3) | 0;
    result = result * 31 + Kotlin.hashCode(this.startAngle) | 0;
    return result;
  };
  Orientation.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.f0, other.f0) && Kotlin.equals(this.f1, other.f1) && Kotlin.equals(this.f2, other.f2) && Kotlin.equals(this.f3, other.f3) && Kotlin.equals(this.b0, other.b0) && Kotlin.equals(this.b1, other.b1) && Kotlin.equals(this.b2, other.b2) && Kotlin.equals(this.b3, other.b3) && Kotlin.equals(this.startAngle, other.startAngle)))));
  };
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  Point.prototype.plus_1a0nlc$ = function (p) {
    return new Point(p.x + this.x, p.y + this.y);
  };
  Point.prototype.times_14dthe$ = function (k) {
    return new Point(this.x * k, this.y * k);
  };
  Point.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Point',
    interfaces: []
  };
  Point.prototype.component1 = function () {
    return this.x;
  };
  Point.prototype.component2 = function () {
    return this.y;
  };
  Point.prototype.copy_lu1900$ = function (x, y) {
    return new Point(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Point.prototype.toString = function () {
    return 'Point(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Point.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Point.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function Layout(orientation, size, origin) {
    this.orientation = orientation;
    this.size = size;
    this.origin = origin;
  }
  Layout.prototype.hexToPixel_1jwb$ = function (hex) {
    var M = this.orientation;
    var x = (M.f0 * hex.q + M.f1 * hex.r) * this.size.x;
    var y = (M.f2 * hex.q + M.f3 * hex.r) * this.size.y;
    return new Point(x + this.origin.x, y + this.origin.y);
  };
  Layout.prototype.pixelToHex_1a0nlc$ = function (p) {
    var M = this.orientation;
    var pt = new Point((p.x - this.origin.x) / this.size.x, (p.y - this.origin.y) / this.size.y);
    var q = M.b0 * pt.x + M.b1 * pt.y;
    var r = M.b2 * pt.x + M.b3 * pt.y;
    return new FractionalHex(q, r);
  };
  Layout.prototype.cornerOffset_za3lpa$ = function (corner) {
    var angle = 2.0 * Math.PI * (this.orientation.startAngle + corner) / 6.0;
    return new Point(this.size.x * Math.cos(angle), this.size.y * Math.sin(angle));
  };
  Layout.prototype.corners_1jwb$ = function (h) {
    var center = this.hexToPixel_1jwb$(h);
    var $receiver = new IntRange(0, 5);
    var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(this.cornerOffset_za3lpa$(item).plus_1a0nlc$(center));
    }
    return destination;
  };
  Layout.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Layout',
    interfaces: []
  };
  Layout.prototype.component1 = function () {
    return this.orientation;
  };
  Layout.prototype.component2 = function () {
    return this.size;
  };
  Layout.prototype.component3 = function () {
    return this.origin;
  };
  Layout.prototype.copy_osldmg$ = function (orientation, size, origin) {
    return new Layout(orientation === void 0 ? this.orientation : orientation, size === void 0 ? this.size : size, origin === void 0 ? this.origin : origin);
  };
  Layout.prototype.toString = function () {
    return 'Layout(orientation=' + Kotlin.toString(this.orientation) + (', size=' + Kotlin.toString(this.size)) + (', origin=' + Kotlin.toString(this.origin)) + ')';
  };
  Layout.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.orientation) | 0;
    result = result * 31 + Kotlin.hashCode(this.size) | 0;
    result = result * 31 + Kotlin.hashCode(this.origin) | 0;
    return result;
  };
  Layout.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.orientation, other.orientation) && Kotlin.equals(this.size, other.size) && Kotlin.equals(this.origin, other.origin)))));
  };
  function Tile(id, image) {
    this.id = id;
    this.image = image;
  }
  Tile.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Tile',
    interfaces: []
  };
  Tile.prototype.component1 = function () {
    return this.id;
  };
  Tile.prototype.component2 = function () {
    return this.image;
  };
  Tile.prototype.copy_bblzc9$ = function (id, image) {
    return new Tile(id === void 0 ? this.id : id, image === void 0 ? this.image : image);
  };
  Tile.prototype.toString = function () {
    return 'Tile(id=' + Kotlin.toString(this.id) + (', image=' + Kotlin.toString(this.image)) + ')';
  };
  Tile.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.id) | 0;
    result = result * 31 + Kotlin.hashCode(this.image) | 0;
    return result;
  };
  Tile.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.image, other.image)))));
  };
  function Triangle(tile_0) {
    this.tile = tile_0;
  }
  Triangle.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Triangle',
    interfaces: []
  };
  Triangle.prototype.component1 = function () {
    return this.tile;
  };
  Triangle.prototype.copy_1c420h$ = function (tile_0) {
    return new Triangle(tile_0 === void 0 ? this.tile : tile_0);
  };
  Triangle.prototype.toString = function () {
    return 'Triangle(tile=' + Kotlin.toString(this.tile) + ')';
  };
  Triangle.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.tile) | 0;
    return result;
  };
  Triangle.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.tile, other.tile))));
  };
  function HexTile() {
    this.tris = Kotlin.newArrayF(6, HexTile$tris$lambda);
  }
  function HexTile$tris$lambda(it) {
    return new Triangle(null);
  }
  HexTile.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'HexTile',
    interfaces: []
  };
  function HexGrid(layout) {
    this.layout = layout;
    this.map = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$();
    this.highlight = null;
    this.highlightIndex = null;
    this.mx = 0.0;
    this.my = 0.0;
  }
  HexGrid.prototype.load_e00e4q$ = function (lines, tiles) {
    var tmp$;
    tmp$ = lines.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0;
      var regex = Regex('\\(([\\-0-9]+), ([\\-0-9]+)\\) = \\[ ([0-9A-Za-z_]+),([0-9A-Za-z_]+),([0-9A-Za-z_]+),([0-9A-Za-z_]+),([0-9A-Za-z_]+),([0-9A-Za-z_]+) \\]');
      var r = regex.matchEntire_6bul2c$(element);
      if (r != null) {
        var hex = new Hex(toInt(r.groupValues.get_za3lpa$(1)), toInt(r.groupValues.get_za3lpa$(2)));
        var $receiver = ((tmp$_0 = this.map.get_11rb$(hex)) != null ? tmp$_0 : Kotlin.throwNPE()).tris;
        var tmp$_1, tmp$_2;
        var index = 0;
        for (tmp$_1 = 0; tmp$_1 !== $receiver.length; ++tmp$_1) {
          var item = $receiver[tmp$_1];
          var i = (tmp$_2 = index, index = tmp$_2 + 1 | 0, tmp$_2);
          var id = r.groupValues.get_za3lpa$(i + 3 | 0);
          var firstOrNull_6jwkkr$result;
          firstOrNull_6jwkkr$break: {
            var tmp$_3;
            tmp$_3 = tiles.iterator();
            while (tmp$_3.hasNext()) {
              var element_0 = tmp$_3.next();
              if (Kotlin.equals(element_0.id, id)) {
                firstOrNull_6jwkkr$result = element_0;
                break firstOrNull_6jwkkr$break;
              }
            }
            firstOrNull_6jwkkr$result = null;
          }
          item.tile = firstOrNull_6jwkkr$result;
        }
      }
    }
  };
  function HexGrid$save$lambda$lambda(it) {
    var tmp$, tmp$_0;
    return (tmp$_0 = (tmp$ = it.tile) != null ? tmp$.id : null) != null ? tmp$_0 : 'null';
  }
  HexGrid.prototype.save = function () {
    var result = {v: ''};
    var tmp$;
    tmp$ = this.map.entries.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var hex = element.key;
      var tile_0 = element.value;
      var $receiver = tile_0.tris;
      var any$result;
      any$break: {
        var tmp$_0;
        for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
          var element_0 = $receiver[tmp$_0];
          if (element_0.tile != null) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
      if (any$result) {
        result.v += '(' + hex.q + ', ' + hex.r + ') = [ ';
        result.v += joinToString(tile_0.tris, ',', void 0, void 0, void 0, void 0, HexGrid$save$lambda$lambda);
        result.v += ' ]\n';
      }
    }
    return result.v;
  };
  HexGrid.prototype.setTile_1jvf2$ = function (tile_0) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    if (this.highlightIndex != null && this.highlight != null) {
      tmp$_3 = (tmp$_0 = this.map.get_11rb$(((tmp$ = this.highlight) != null ? tmp$ : Kotlin.throwNPE()).round())) != null ? tmp$_0.tris : null;
      tmp$_2 = (tmp$_1 = this.highlightIndex) != null ? tmp$_1 : Kotlin.throwNPE();
      (tmp$_4 = tmp$_3 != null ? tmp$_3[tmp$_2] : null) != null ? (tmp$_4.tile = tile_0) : null;
    }
  };
  HexGrid.prototype.fill_za3lpa$ = function (radius) {
    var tmp$;
    tmp$ = (new IntRange(-radius, radius)).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var r1 = Math.max(-radius, -element - radius | 0);
      var r2 = Math.min(radius, -element + radius | 0);
      var tmp$_0;
      tmp$_0 = (new IntRange(r1, r2)).iterator();
      while (tmp$_0.hasNext()) {
        var element_0 = tmp$_0.next();
        var hex = new Hex(element, element_0);
        var tile_0 = new HexTile();
        this.map.put_xwzc9p$(hex, tile_0);
      }
    }
  };
  HexGrid.prototype.drawContour_ow8it5$ = function (context, hex) {
    var corners = this.layout.corners_1jwb$(hex);
    var start = corners.get_za3lpa$(0);
    context.moveTo(start.x, start.y);
    var tmp$;
    tmp$ = corners.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      context.lineTo(element.x, element.y);
    }
    context.lineTo(start.x, start.y);
  };
  HexGrid.prototype.drawTriContour_2rlzyj$ = function (context, hex, type) {
    var center = this.layout.hexToPixel_1jwb$(hex);
    var corners = this.layout.corners_1jwb$(hex);
    context.moveTo(center.x, center.y);
    context.lineTo(corners.get_za3lpa$(type).x, corners.get_za3lpa$(type).y);
    context.lineTo(corners.get_za3lpa$((type + 5 | 0) % 6).x, corners.get_za3lpa$((type + 5 | 0) % 6).y);
    context.lineTo(center.x, center.y);
  };
  HexGrid.prototype.drawTriImage_c4xj9c$ = function (context, hex, type, img) {
    var center = this.layout.hexToPixel_1jwb$(hex);
    var angle = 2.0 * Math.PI * (this.layout.orientation.startAngle + type - 2) / 6.0;
    var h = this.layout.size.y * Math.cos(30.0 / 180.0 * Math.PI);
    context.save();
    context.translate(center.x, center.y);
    context.rotate(angle);
    context.drawImage(img, -this.layout.size.x / 2.0, 0.0, this.layout.size.x, h);
    context.restore();
  };
  HexGrid.prototype.drawGrid_f69bme$ = function (context) {
    var tmp$;
    context.save();
    context.beginPath();
    var tmp$_0;
    tmp$_0 = this.map.entries.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var hex_0 = element.key;
      var tile_0 = element.value;
      this.drawContour_ow8it5$(context, hex_0);
      var $receiver = tile_0.tris;
      var tmp$_1, tmp$_2;
      var index = 0;
      for (tmp$_1 = 0; tmp$_1 !== $receiver.length; ++tmp$_1) {
        var item = $receiver[tmp$_1];
        var i = (tmp$_2 = index, index = tmp$_2 + 1 | 0, tmp$_2);
        var tmp$_3;
        if (item.tile != null) {
          var image = ((tmp$_3 = item.tile) != null ? tmp$_3 : Kotlin.throwNPE()).image;
          this.drawTriImage_c4xj9c$(context, hex_0, i, image);
        }
      }
    }
    context.strokeStyle = '#119';
    context.stroke();
    this.highlight = this.layout.pixelToHex_1a0nlc$(new Point(this.mx, this.my));
    if (this.highlight != null) {
      var hex = ((tmp$ = this.highlight) != null ? tmp$ : Kotlin.throwNPE()).round();
      context.beginPath();
      var corners = this.layout.corners_1jwb$(hex);
      var start = corners.get_za3lpa$(0);
      var center = this.layout.hexToPixel_1jwb$(hex);
      context.moveTo(start.x, start.y);
      var last = {v: false};
      var hl = {v: 0};
      var tmp$_4, tmp$_5;
      var index_0 = 0;
      tmp$_4 = corners.iterator();
      while (tmp$_4.hasNext()) {
        var item_0 = tmp$_4.next();
        var i_0 = (tmp$_5 = index_0, index_0 = tmp$_5 + 1 | 0, tmp$_5);
        context.lineTo(item_0.x, item_0.y);
        var side = (item_0.x - center.x) * (this.my - center.y) - (item_0.y - center.y) * (this.mx - center.x) > 0;
        if (i_0 > 0) {
          if (last.v && !side) {
            hl.v = i_0;
          }
        }
        last.v = side;
      }
      this.highlightIndex = hl.v;
      context.lineTo(start.x, start.y);
      context.strokeStyle = '#191';
      context.stroke();
      context.beginPath();
      this.drawTriContour_2rlzyj$(context, hex, hl.v);
      context.strokeStyle = '#FFF';
      context.stroke();
      this.highlight;
    }
    context.restore();
  };
  HexGrid.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'HexGrid',
    interfaces: []
  };
  function getImage(path) {
    var tmp$;
    var image = Kotlin.isType(tmp$ = window.document.createElement('img'), HTMLImageElement) ? tmp$ : Kotlin.throwCCE();
    image.src = path;
    return image;
  }
  function tile(name) {
    return new Tile(name, getImage('tile_' + name + '.png'));
  }
  function MondarionCanvas() {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    this.canvas = Kotlin.isType(tmp$ = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    this.context = Kotlin.isType(tmp$_0 = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : Kotlin.throwCCE();
    this.palette = Kotlin.isType(tmp$_1 = document.getElementById('palette'), HTMLFieldSetElement) ? tmp$_1 : Kotlin.throwCCE();
    this.save = Kotlin.isType(tmp$_2 = document.getElementById('save'), HTMLTextAreaElement) ? tmp$_2 : Kotlin.throwCCE();
    this.apply = Kotlin.isType(tmp$_3 = document.getElementById('apply'), HTMLButtonElement) ? tmp$_3 : Kotlin.throwCCE();
    this.grid = new HexGrid(new Layout(Orientation$Companion_getInstance().flat, new Point(75.0, 75.0), new Point(this.canvas.width / 2.0, this.canvas.height / 2.0)));
    this.tiles = listOf([tile('flat'), tile('up_0_0'), tile('up_1_0'), tile('up_0_1'), tile('up_1_1'), tile('down_0_0'), tile('down_1_0'), tile('down_0_1'), tile('down_1_1')]);
    this.selected = null;
    this.grid.fill_za3lpa$(3);
    var tmp$_4, tmp$_5;
    var index = 0;
    tmp$_4 = this.tiles.iterator();
    while (tmp$_4.hasNext()) {
      var item = tmp$_4.next();
      var i = (tmp$_5 = index, index = tmp$_5 + 1 | 0, tmp$_5);
      var tmp$_6, tmp$_7;
      var node = Kotlin.isType(tmp$_6 = document.createElement('input'), HTMLInputElement) ? tmp$_6 : Kotlin.throwCCE();
      node.type = 'radio';
      node.id = 'tile' + i;
      node.name = 'Palette';
      node.onclick = MondarionCanvas_init$lambda$lambda(item, this);
      var label = Kotlin.isType(tmp$_7 = document.createElement('label'), HTMLLabelElement) ? tmp$_7 : Kotlin.throwCCE();
      label.htmlFor = node.id;
      label.appendChild(item.image);
      this.palette.appendChild(node);
      this.palette.appendChild(label);
    }
  }
  MondarionCanvas.prototype.draw = function () {
    this.context.save();
    this.context.fillStyle = '#999';
    this.context.fillRect(0.0, 0.0, this.canvas.width, this.canvas.height);
    this.grid.drawGrid_f69bme$(this.context);
    this.context.restore();
  };
  function MondarionCanvas$start$lambda(this$MondarionCanvas) {
    return function (evt) {
      var tmp$, tmp$_0;
      var rect = this$MondarionCanvas.canvas.getBoundingClientRect();
      var x = (Kotlin.isType(tmp$ = evt, MouseEvent) ? tmp$ : Kotlin.throwCCE()).clientX - rect.left;
      var y = (Kotlin.isType(tmp$_0 = evt, MouseEvent) ? tmp$_0 : Kotlin.throwCCE()).clientY - rect.top;
      this$MondarionCanvas.grid.mx = x;
      this$MondarionCanvas.grid.my = y;
      return 0;
    };
  }
  function MondarionCanvas$start$lambda_0(this$MondarionCanvas) {
    return function (evt) {
      var tmp$;
      if (this$MondarionCanvas.selected != null) {
        this$MondarionCanvas.grid.setTile_1jvf2$((tmp$ = this$MondarionCanvas.selected) != null ? tmp$ : Kotlin.throwNPE());
        this$MondarionCanvas.save.value = this$MondarionCanvas.grid.save();
      }
      return 0;
    };
  }
  function MondarionCanvas$start$lambda_1(this$MondarionCanvas) {
    return function (evt) {
      var lines = split(this$MondarionCanvas.save.value, ['\n']);
      this$MondarionCanvas.grid.load_e00e4q$(lines, this$MondarionCanvas.tiles);
      return 0;
    };
  }
  function MondarionCanvas$start$lambda_2(this$MondarionCanvas) {
    return function () {
      this$MondarionCanvas.draw();
    };
  }
  MondarionCanvas.prototype.start = function () {
    this.canvas.onmousemove = MondarionCanvas$start$lambda(this);
    this.canvas.onmousedown = MondarionCanvas$start$lambda_0(this);
    this.apply.onclick = MondarionCanvas$start$lambda_1(this);
    window.setInterval(MondarionCanvas$start$lambda_2(this), 1000 / 30 | 0);
  };
  function MondarionCanvas_init$lambda$lambda(closure$tile, this$MondarionCanvas) {
    return function (it) {
      this$MondarionCanvas.selected = closure$tile;
      return 0;
    };
  }
  MondarionCanvas.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'MondarionCanvas',
    interfaces: []
  };
  function main$lambda() {
    (new MondarionCanvas()).start();
  }
  function main(args) {
    $(main$lambda);
  }
  Object.defineProperty(Hex, 'Companion', {
    get: Hex$Companion_getInstance
  });
  _.Hex = Hex;
  _.FractionalHex = FractionalHex;
  Object.defineProperty(Orientation, 'Companion', {
    get: Orientation$Companion_getInstance
  });
  _.Orientation = Orientation;
  _.Point = Point;
  _.Layout = Layout;
  _.Tile = Tile;
  _.Triangle = Triangle;
  _.HexTile = HexTile;
  _.HexGrid = HexGrid;
  _.getImage_61zpoe$ = getImage;
  _.tile_61zpoe$ = tile;
  _.MondarionCanvas = MondarionCanvas;
  _.main_kand9s$ = main;
  Kotlin.defineModule('mondarion', _);
  main([]);
  return _;
}(typeof mondarion === 'undefined' ? {} : mondarion, kotlin);

//@ sourceMappingURL=mondarion.js.map
