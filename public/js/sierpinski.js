function renderSierpinski(workspace) {
    var Point = function (x, y) {
        this.x = function () {
            return x;
        };
        this.y = function () {
            return y;
        };

        this.add = function (point) {
            return new Point(x + point.x(), y + point.y());
        };

        this.dot = function (point) {
            return x * point.x() + y * point.y();
        };

        this.multiply = function (scalar) {
            return new Point(x * scalar, y * scalar);
        };

        this.subtract = function (point) {
            return new Point(x - point.x(), y - point.y());
        };

        this.toString = function () {
            return '(' + x + ', ' + y + ')';
        }
    };

    var Colour = function (r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    };

    function toPixelIndex(point) {
        return (parseInt(point.y()) * 400 * 4) + (parseInt(point.x()) * 4);
    }

    function paint(pixels, point, colour) {
        var index = parseInt(toPixelIndex(point));
        pixels[index] = parseInt(colour.r * 0xff);
        pixels[index + 1] = parseInt(colour.g * 0xff);
        pixels[index + 2] = parseInt(colour.b * 0xff);
        pixels[index + 3] = parseInt(colour.a * 0xff);
    }

    function inBetween(p1, p2, fraction) {
        var vector = p2.subtract(p1);
        var scaled = vector.multiply(fraction);
        return p1.add(scaled);
    }

    function render(pixels) {
        var triangle = [new Point(200, 0), new Point(0, 260), new Point(399, 260)];
        var point = triangle[parseInt(Math.random() * 3)];
        for (var i = 0; i < 30000; i += 1) {
            var corner = triangle[parseInt(Math.random() * 3)];

            var fraction = 0.5;
            point = inBetween(point, corner, fraction);
            var colour = new Colour(0.5, 0.8, 0.5, 1);
            paint(pixels, point, colour);
        }
    }

    var context = workspace.getContext('2d');
    var image = context.createImageData(workspace.width, workspace.height);
    render(image.data);
    context.putImageData(image, 0, 0);
};