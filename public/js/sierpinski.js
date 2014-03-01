'use strict';

// render a sierpinski triangle
function renderSierpinski(workspace) {

    // this allows us to represent and work with points more easily
    var Point = function (x, y) {
        // get the column for this point
        this.x = function () {
            return x;
        };

        // get the row for this point
        this.y = function () {
            return y;
        };

        // add another point and this point
        this.add = function (point) {
            return new Point(x + point.x(), y + point.y());
        };

        // calculate the dot product of this point and another point
        this.dot = function (point) {
            return x * point.x() + y * point.y();
        };

        // multiple this point by the specified scalar value
        this.multiply = function (scalar) {
            return new Point(x * scalar, y * scalar);
        };

        // calculate the difference between this point and another point
        this.subtract = function (point) {
            return new Point(x - point.x(), y - point.y());
        };

        // show the point as a string
        this.toString = function () {
            return '(' + x + ', ' + y + ')';
        }
    };

    var Colour = function (r, g, b, a) {
        if (!this instanceof Colour) {
            return new Colour(r, g, b, a);
        }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    };

    function toPixelIndex(point) {
        // The points are stored in a large array with each pixel represented by
        // four consecutive values. The pixels are ordered one row after another,
        // so to find the point we need, we first multiply the row we need by
        // the number of columns for each row and then by four for the four components
        // for each pixel. Then we move forward four for each pixel in the row before
        // the one we want.
        return (parseInt(point.y()) * 400 * 4) + (parseInt(point.x()) * 4);
    }

    function paint(pixels, point, colour) {
        // start at the index for the chosen point
        var index = parseInt(toPixelIndex(point));
        // set the sequene of entries to the red, green, blue, and alpha values
        pixels[index] = parseInt(colour.r * 0xff);
        pixels[index + 1] = parseInt(colour.g * 0xff);
        pixels[index + 2] = parseInt(colour.b * 0xff);
        pixels[index + 3] = parseInt(colour.a * 0xff);
    }

    // returns the point the specified fraction between p1 and p2
    function inBetween(p1, p2, fraction) {
        // find the vector from p1 to p2
        var vector = p2.subtract(p1);
        // scale the vector by the specified fraction
        var scaled = vector.multiply(fraction);
        // add the vector to p1 to get the appropriate point
        return p1.add(scaled);
    }

    function render(pixels) {
        // set up a triangle by choosing three points - one for each corner
        var triangle = [new Point(200, 0), new Point(0, 260), new Point(399, 260)];
        // choose a random corner to start in
        var point = triangle[parseInt(Math.random() * 3)];
        // repeat the block below 30,000 times
        for (var i = 0; i < 30000; i += 1) {
            // choose a random corner of the triangle
            var corner = triangle[parseInt(Math.random() * 3)];

            // choose the fraction of the distance to move towards the corner
            var fraction = 0.5;
            // get the point the chosen fraction of the distance between the
            // current point and the chosen corner
            point = inBetween(point, corner, fraction);
            // choose a colour to make the point
            var colour = new Colour(0.5, 0.8, 0.5, 1);
            // put a dot at the point in the colour
            paint(pixels, point, colour);
        }
    }

    // get the 2D canvas context
    var context = workspace.getContext('2d');
    // create an image we can use with that context
    var image = context.createImageData(workspace.width, workspace.height);
    // draw everything to the image
    render(image.data);
    // display the image on the canvas
    context.putImageData(image, 0, 0);
};