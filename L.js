function L(sources, callback) {
    for (var doc = document, length = sources.length, loaded = 0, i = 0; i < length; ) {
        loadScript(sources[i++]);
    }

    function loadScript(source) {
        var readyState = 'readyState', firstChild = 'firstChild',
            script = doc.createElement('script'), head = doc.documentElement[firstChild], regex = /de|co/, // /loaded|complete/
            eventName = (!script[readyState] || regex.test(script[readyState])) ? 'onload' : 'onreadystatechange'; // Opera9.6 readyState is always 'loaded'

        script[eventName] = function() {
            if (!script[readyState] || regex.test(script[readyState])) {
                if (++loaded == length && callback) {
                    callback();
                }
            }
        }

        script.src = source;
        head.insertBefore(script, head[firstChild]);
    }
}
