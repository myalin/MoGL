var Texture = (function() {
    var imgType, canvas, context, empty, resizer,
        resize, imgs, loaded, isLoaded,
        Texture, fn;

    //lib
    imgType = {'.jpg':1, '.png':1, '.gif':1},
    canvas = document.createElement('canvas'),
	context = canvas.getContext('2d'),
    canvas.width = canvas.height = 2,
    context.clearRect(0, 0, 2, 2),
    empty = document.createElement('img'),
    empty.src = canvas.toDataURL(),

    resizer = function(resizeType, v){
        var tw, th, dw, dh;
        //texture size
        tw = th = 1;
        while (v.width > tw) tw *= 2;
        while (v.height > th) th *= 2;
        //fit size
        if (v.width == tw && v.height == th) return;
        
        if (resizeType == Texture.zoomOut) {
            if (v.width < tw) tw /= 2;
            if (v.height < th) th /= 2;
        }
        //canvas init
        canvas.width = dw = tw,
        canvas.height = dh = th,
        context.clearRect(0, 0, tw, th);
        
        switch(resizeType){
        case Texture.crop:
            if (v.width < tw) dw = tw / 2;
            if (v.height < th) dh = th / 2;
            context.drawImage(v, 0, 0, tw, th, 0, 0, dw, dh);
            break;
        case Texture.addSpace:
            context.drawImage(v, 0, 0, tw, th, 0, 0, tw, th);
            break;
        default:
            context.drawImage(v, 0, 0, dw, dh);
        }
        v.src = context.toDataURL();
        return v;
    };
    //private
    resize = {},
    imgs = {},
    isLoaded = {},
    loaded = function(e){
        isLoaded[this] = true,
        imgs[this] = resizer(self.resizeType, this),
        self.dispatch('load');
    };
    //shared private
    $setPrivate('Texture', {
    }),
    Texture = function Texture(){
        var self = this;
        isLoaded[this] = false
    },
    fn = Texture.prototype,
    fn.prop = {
        resizeType:{
            get:$getter(resize, false, 'zoomOut'),
            set:function resizeTypeSet(v){
                if (Texture[type]) {
                    resize[this] = type;
                } else {
                    this.error(0);
                }
                
            }
        },
        isLoaded:{get:$getter(isLoaded, false, false)},
        img:{
            get:$getter(imgs, false, empty),
            set:function imgSet(v){
                var loaded, img, w, h;
                img = v;
                if (v instanceof HTMLImageElement){
                    if (src.complete) {
                        loaded = true;
                    }
                } else if (v instanceof ImageData){
                    loaded = true,
                    canvas.width = w = v.width,
                    canvas.height = h = v.height,
                    context.clearRect(0, 0, w, h),
                    context.putImageData(v, 0, 0),
                    img = document.createElement('img'),
                    img.src = context.toDataURL();
                } else if (typeof v == 'string') {
                    if (v.substring(0, 10) == 'data:image' && v.indexOf('base64') > -1){
                        loaded = true;
                    } else if (!imgType[src.substring(-4)]) {
                        this.error(1);
                    }
                    img = document.createElement('img'),
                    img.src = v;
                } else {
                    this.error(0);
                }
                if (loaded){
                    isLoaded[this] = true;
                    imgs[this] = resizer(this.resizeType, img)
                    self.dispatch('load');
                } else {
                    img.addEventListener('load', loaded, this);
                }
            }
        }
    },
    (function() {
        (function(){
            var key = 'zoomOut,zoomIn,crop,addSpace,diffuse,specular,diffuseWrap,normal,specularNormal'.split(','), i = key.length;
            while (i--) Texture[key[i]] = key[i];
        })();
    })();
    return MoGL.ext(Texture,MoGL);
})();