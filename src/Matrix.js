/**
 * Created by redcamel on 2015-05-05.
 */

var Matrix = (function () {
    var Matrix, fn;
    Matrix = function Matrix() {
        this.data = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    }
    fn = Matrix.prototype
    fn.identity = function () {
        var t = this.data
        t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1
        return this
    }
    return MoGL.ext(Matrix, MoGL);
})();