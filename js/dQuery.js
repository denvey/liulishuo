/**
 * Created by dwzjq on 14-1-3.
 */
(function(window, undefined ){
    var
        window = this,
        undefined,
        document = window.document,
        _jQuery = window.dQuery, //暂存dQuery变量
        _$ = window.$, //暂存$变量
        dQuery = window.dQuery = window.$ = function( selector, context ){
            return new dQuery.fn.init( selector, context);
        },
        quickExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)]$/,
        isSimple = /^.[^:#\[\.,]*$/,
        _jsonPID = 1,
        emptyArray = [],
        empty = function(){},
        rclass = /[\t\r\n\f]/g;


    dQuery.fn = dQuery.prototype = {
        init:function( selector, context){
            selector = selector || document; //确保selector有值，默认值为document
            context = context || document; //默认值为document
            if( selector.nodeType){
                this[0] = selector;
                this.length = 1;
                this.context =selector;
                return this;
            }else if( typeof selector === "string"){
                var e = context.querySelectorAll(selector);
                for(var i = 0;i < e.length;i ++){ //遍历元素集合，并把所有元素填入到当前实例数组中
                    this[i] = e[i];
                }
                this.length = e.length;
                this.context = context;
                return this; //返回当前实例
            }else if(dQuery.isFunction(selector)){
                return dQuery(document).ready(selector);
            }else{
                this.length = 0;
                this.context = context;
                return this;
            }
        },
        dQuery:"1.0.0",
        size:function(){
            return this.length;
        },
        indexOf: emptyArray.indexOf,
        each: function( callback, args ) {
            return dQuery.each( this, callback, args );
        },
        ready: function(callback) {
            if (document.readyState === "complete" || document.readyState === "loaded" )
                callback();
            else
                document.addEventListener("DOMContentLoaded", callback, false);
            return this;
        },
        html:function(value){
            return value === undefined ? (this[0] ? this[0].innerHTML.replace(/dQuery\d+="(?:\d+|null)"/g,"") : null):
                this.empty().append( value);
        },
        empty: function() {
            var elem,
                i = 0;
            for ( ; (elem = this[i]) != null; i++ ) {
                if ( elem.nodeType === 1 ) {
                    elem.textContent = "";
                }
            }
            return this;
        },
        text: function(text) {
            if (this.length === 0)
                return this;
            if (text === undefined)
                return this[0].textContent;
            for (var i = 0; i < this.length; i++) {
                this[i].textContent = text;
            }
            return this;
        },
        val: function(value) {
            if (this.length === 0)
                return (value === undefined) ? undefined : this;
            if (value == undefined)
                return this[0].value;
            for (var i = 0; i < this.length; i++) {
                this[i].value = value;
            }
            return this;
        },
        attr:function(attr, value){
            if (this.length === 0){
                return (value === nundefined) ? undefined : this;
            }
            if(value === undefined && !$.isObject(attr)){
                var val = this[0].getAttribute(attr);
                return val;
            }
            for (var i = 0; i < this.length; i++) {
                this[i].setAttribute(attr, value);
            }
        },
        append: function(html) {
            if (typeof html === "string"){
                for (var i = 0; i < this.length; i++) {
                    this[i].innerHTML = html;
                }
            }else{
                for (var i = 0; i < this.length; i++) {
                    this[i].appendChild(html);
                }
            }
            return this;
        },
        insertBefore: function(target, after) {
            if (this.length === 0)
                return this;
            target = $(target).get(0);
            if (!target)
                return this;
            for (var i = 0; i < this.length; i++) {
                after ? target.parentNode.insertBefore(this[i], target.nextSibling) : target.parentNode.insertBefore(this[i], target);
            }
            return this;
        },
        hasClass: function( selector, element ) {
            var className = " " + selector + " ";
            if (!element)
                element = this[0];
            if ( element.nodeType === 1 && (" " + element.className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                return true;
            }
            return false;
        },
        addClass:function( name){
            if (name === undefined)
                return this;
            for (var i = 0; i < this.length; i++) {
                var cls = this[i].className;
                var classList = [];
                var that = this;
                name.split(/\s+/g).forEach(function(cname) {
                    if (!that.hasClass(cname, that[i]))
                        classList.push(cname);
                });
                this[i].className += (cls ? " " : "") + classList.join(" ");
                this[i].className = this[i].className.trim();
            }
            return this;
        },
        removeClass:function( name){
            if(name === undefined)
                return this;
            for (var i = 0; i < this.length; i++) {
                if (name == undefined) {
                    this[i].className = '';
                    return this;
                }
                var classList = this[i].className;

                if (typeof this[i].className == "object") {
                    classList = " ";
                }
                name.split(/\s+/g).forEach(function(cname) {
                    classList = classList.replace(cname, " ");
                });
                if (classList.length > 0)
                    this[i].className = classList.trim();
                else
                    this[i].className = "";
            }
            return this;
        },
        remove: function() {
            for (var i = 0; i < this.length; i++) {
                if (this[i] && this[i].parentNode) {
                    this[i].parentNode.removeChild(this[i]);
                }
            }
            return this;
        },
        eq: function(ind) {
            return $(this.get(ind));
        },
        get:function(index) {
            index = index == undefined ? 0 : index;
            if (index < 0)
                index += this.length;
            return (this[index]) ? this[index] : undefined;
        },
        next: function( elem ) {
            var tmp=this.get(0).nextSibling;
            if(tmp == null) return null;
            while (tmp && tmp.nodeType!=1){
                tmp=tmp.nextSibling;
            }
            return $(tmp);
        },
        prev: function( elem ) {
            var tmp=this.get(0).previousSibling;
            if(tmp == null) return null;
            while (tmp && tmp.nodeType!=1){
                tmp=tmp.previousSibling;
            }
            return $(tmp);
        },
        parent:function(){
            var tmp=this.get(0).parentNode;
            if(tmp == null) return null;
            while (tmp && tmp.nodeType!=1){
                tmp=tmp.parent;
            }
            return $(tmp);
        },
        parents:function(){
            var tmp=this.get(0).parentNode.parentNode;
            if(tmp == null) return null;
            while (tmp && tmp.nodeType!=1){
                tmp=tmp.parent;
            }
            return $(tmp);
        },
        closest: function(selector, context) {
            if (this.length === 0)
                return this;
            var elems = [],
                cur = this[0];

            var start = $(selector, context);
            if (start.length === 0)
                return $();
            while (cur && start.indexOf(cur) == -1) {
                cur = cur !== context && cur !== document && cur.parentNode;
            }

            return $(cur);

        }
    }
    dQuery.fn.init.prototype = dQuery.fn;

    dQuery.extend = dQuery.fn.extend = function(obj){
        for( var prop in obj){
            this[prop] = obj[prop];
        }
        return this;
    }
    //dQuery 工具函数
    dQuery.extend({
        each:function( object, callback, args){
            var name,i = 0, length =object.length;
            if(args){ //如果存在回调函数的参数数组
                if(length === undefined){ //如果object 不是dQuery 对象
                    for( name in object){
                        if( callback.apply( object[name], args) === false){//在对象上调用回调函数，如果回调函数返回值为false，则跳出循环
                            break;
                        }
                    }
                }else{ //如果object 是dQuery 对象
                    for(; i < length;){
                        if(callback.apply( object[ i++],args) === false){
                            break;
                        }
                    }
                }
            }else{
                if( length === undefined){
                    for(name in object){
                        if(callback.call(object[name],name,object[name]) === false){
                            break;
                        }
                    }
                }else{
                    for(var value = object[0];i < length && callback.call(value, i, value)!== false;value =object[++i]){}
                }
            }
            return object;
        },
        isObject:function(obj){
            return typeof obj === "object" && obj !== null;
        },
        isFunction:function(obj) {
            return typeof obj === "function" && !(obj instanceof RegExp);
        },
        param:function(obj, prefix) {
            var str = [];
            if (obj instanceof dQuery) {
                obj.each(function() {
                    var k = prefix ? prefix + "[" + this.id + "]" : this.id,
                        v = this.value;
                    str.push((k) + "=" + encodeURIComponent(v));
                });
            } else {
                for (var p in obj) {
                    if (dQuery.isFunction(obj[p]))
                        continue;
                    var k = prefix ? prefix + "[" + p + "]" : p,
                        v = obj[p];
                    str.push(this.isObject(v) ? dQuery.param(v, k) : (k) + "=" + encodeURIComponent(v));
                }
            }
            return str.join("&");
        },
        ajax:function(opts){
            var xhr,
                ajaxSettings = {
                    type: 'GET',
                    beforeSend: empty,
                    success: empty,
                    error: empty,
                    complete: empty,
                    context: undefined,
                    timeout: 0,
                    crossDomain: null
                };
            try{
                var settings = opts || {};
                for (var key in ajaxSettings) {
                    if (typeof(settings[key]) == 'undefined')
                        settings[key] = ajaxSettings[key];
                }
                if (!settings.url)
                    settings.url = window.location;
                if (!settings.contentType)
                    settings.contentType = "application/x-www-form-urlencoded";
                if (!settings.headers)
                    settings.headers = {};

                if (!('async' in settings) || settings.async !== false)
                    settings.async = true;
                if (typeof settings.data === "object")
                    settings.data = dQuery.param(settings.data);
                if (settings.type.toLowerCase() === "get" && settings.data) {
                    if (settings.url.indexOf("?") === -1)
                        settings.url += "?" + settings.data;
                    else
                        settings.url += "&" + settings.data;
                }

                if (!settings.dataType)
                    settings.dataType = "text/html";
                else {
                    switch (settings.dataType) {
                        case "script":
                            settings.dataType = 'text/javascript, application/javascript';
                            break;
                        case "json":
                            settings.dataType = 'application/json';
                            break;
                        case "xml":
                            settings.dataType = 'application/xml, text/xml';
                            break;
                        case "html":
                            settings.dataType = 'text/html';
                            break;
                        case "text":
                            settings.dataType = 'text/plain';
                            break;
                        case "jsonp":
                            return dQuery.jsonP(settings);
                            break;
                        default:
                            settings.dataType = "text/html";
                            break;
                    }
                }

                if (/=\?/.test(settings.url)) {
                    return $.jsonP(settings);
                }
                if (settings.crossDomain === null) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
                    RegExp.$2 != window.location.host;

                if (!settings.crossDomain)
                    settings.headers = $.extend({
                        'X-Requested-With': 'XMLHttpRequest'
                    }, settings.headers);
                var abortTimeout;
                var context = settings.context;
                var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;

                xhr = new window.XMLHttpRequest();

                xhr.onreadystatechange = function() {
                    var mime = settings.dataType;
                    if (xhr.readyState === 4) {
                        clearTimeout(abortTimeout);
                        var result, error = false;
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0 && protocol == 'file:') {
                            if (mime === 'application/json' && !(/^\s*$/.test(xhr.responseText))) {
                                try {
                                    result = JSON.parse(xhr.responseText);
                                } catch (e) {
                                    error = e;
                                }
                            } else if (mime === 'application/xml, text/xml') {
                                result = xhr.responseXML;
                            } else if (mime == "text/html") {
                                result = xhr.responseText;
                                $.parseJS(result);
                            } else
                                result = xhr.responseText;
                            if (xhr.status === 0 && result.length === 0)
                                error = true;
                            if (error)
                                settings.error.call(context, xhr, 'parsererror', error);
                            else {
                                settings.success.call(context, result, 'success', xhr);
                            }
                        } else {
                            error = true;
                            settings.error.call(context, xhr, 'error');
                        }
                        settings.complete.call(context, xhr, error ? 'error' : 'success');
                    }
                };
                xhr.open(settings.type, settings.url, settings.async);
                if (settings.withCredentials) xhr.withCredentials = true;

                if (settings.contentType)
                    settings.headers['Content-Type'] = settings.contentType;
                for (var name in settings.headers)
                    if (typeof settings.headers[name] === 'string')
                        xhr.setRequestHeader(name, settings.headers[name]);
                if (settings.beforeSend.call(context, xhr, settings) === false) {
                    xhr.abort();
                    return false;
                }
                if (settings.timeout > 0)
                    abortTimeout = setTimeout(function() {
                        xhr.onreadystatechange = empty;
                        xhr.abort();
                        settings.error.call(context, xhr, 'timeout');
                    }, settings.timeout);
                xhr.send(settings.data);
            } catch (e) {
                console.log(e);
                settings.error.call(context, xhr, 'error', e);
            }
            return xhr;
        },
        jsonP:function(options){
            var callbackName = 'jsonp_callback' + (++_jsonPID);
            var abortTimeout = "",
                context, callback;
            var script = document.createElement("script");
            script.id = callbackName;
            var abort = function() {
                dQuery(script).remove();
                if (window[callbackName])
                    window[callbackName] = empty;
            };
            window[callbackName] = function(data) {
                clearTimeout(abortTimeout);
                dQuery("#"+callbackName).remove();
                delete window[callbackName];
                options.success.call(context, data);
            };
            if (options.url.indexOf('callback=?') !== -1) {
                script.src = options.url.replace(/=\?/, '=' + callbackName);
            } else {
                callback = options.jsonp ? options.jsonp : 'callback';
                if (options.url.indexOf("?") === -1) {
                    options.url += ("?" + callback + '=' + callbackName);
                }
                else {
                    options.url += ("&" + callback + '=' + callbackName);
                }
                script.src = options.url;
            }
            if (options.error) {
                script.onerror = function() {
                    clearTimeout(abortTimeout);
                    options.error.call(context, "", 'error');
                };
            }
            dQuery('head').append(script);
            if (options.timeout > 0)
                abortTimeout = setTimeout(function() {
                    options.error.call(context, "", 'timeout');
                }, options.timeout);
            return {};
        },
        get:function(url, success) {
            return this.ajax({
                url: url,
                success: success
            });
        },
        trim: function( text ) {
            return (text || "").replace( /^\s+|\s+$/g, "" );
        },
        rand: function( ){
            return Math.random().toString().substr(2);
        },
        getUrlVal:function(name){
            /*var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)","i");
            var url =  window.location.href;
            if(reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));*/
            var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.href.substr(1).match(reg);
            if (r!=null) return unescape(r[2]); return null;
        },
        now:function( ){
            return (new Date()).getTime();
        },
        parseJS:function(div) {
            var remoteJSPages = {};
            if (!div)
                return;
            if (typeof(div) == "string") {
                var elem = document.createElement("div");
                elem.innerHTML = div;
                div = elem;
            }
            var scripts = div.getElementsByTagName("script");
            div = null;
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src.length > 0 && !remoteJSPages[scripts[i].src]) {
                    var doc = document.createElement("script");
                    doc.type = scripts[i].type;
                    doc.src = scripts[i].src;
                    document.getElementsByTagName('head')[0].appendChild(doc);
                    remoteJSPages[scripts[i].src] = 1;
                    doc = null;
                } else {
                    window['eval'](scripts[i].innerHTML);
                }
            }
        }
    });
    var handlers = {},
        _afmid = 1;
    function afmid(element) {
        return element._afmid || (element._afmid = _afmid++);
    }
    function findHandlers(element, event, fn, selector) {
        event = parse(event);
        if (event.ns)
            var matcher = matcherFor(event.ns);
        return (handlers[afmid(element)] || []).filter(function(handler) {
            return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || handler.fn == fn || (typeof handler.fn === 'function' && typeof fn === 'function' && "" + handler.fn === "" + fn)) && (!selector || handler.sel == selector);
        });
    }
    function parse(event) {
        var parts = ('' + event).split('.');
        return {
            e: parts[0],
            ns: parts.slice(1).sort().join(' ')
        };
    }
    function matcherFor(ns) {
        return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
    }
    function eachEvent(events, fn, iterator) {
        if ($.isObject(events))
            $.each(events, iterator);
        else
            events.split(/\s/).forEach(function(type) {
                iterator(type, fn);
            });
    }
    dQuery.event = {
        // 绑定事件句柄
        add: function(element, events, fn, selector, getDelegate) {
            var id = afmid(element),
                set = (handlers[id] || (handlers[id] = []));
            eachEvent(events, fn, function(event, fn) {
                var delegate = getDelegate && getDelegate(fn, event),
                    callback = delegate || fn;
                var proxyfn = function(event) {
                    var result = callback.apply(element, [event].concat(event.data));
                    if (result === false)
                        event.preventDefault();
                    return result;
                };
                var handler = $.extend(parse(event), {
                    fn: fn,
                    proxy: proxyfn,
                    sel: selector,
                    del: delegate,
                    i: set.length
                });
                set.push(handler);
                element.addEventListener(handler.e, proxyfn, false);
            });
            //element=null;
        },
        // 删除
        remove: function(element, events, fn, selector) {
            var id = afmid(element);
            eachEvent(events || '', fn, function(event, fn) {
                findHandlers(element, event, fn, selector).forEach(function(handler) {
                    delete handlers[id][handler.i];
                    element.removeEventListener(handler.e, handler.proxy, false);
                });
            });
        }
    };
    dQuery.Event = function( src, props ) {
        var event = document.createEvent('Events'),
            bubbles = true;
        if (props)
            for (var name in props)
                (name == 'bubbles') ? (bubbles = !! props[name]) : (event[name] = props[name]);
        event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null);
        return event;
    };
    dQuery.Event.prototype = {

        // 是否已阻止浏览器默认行为
        isDefaultPrevented: returnFalse,
        // 是否已停止事件传播
        isPropagationStopped: returnFalse,
        // 是否已立即停止事件传播
        isImmediatePropagationStopped: returnFalse,
        // 阻止默认浏览器默认行为
        preventDefault: function() {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;

            if ( e && e.preventDefault ) {
                e.preventDefault();
            }
        },
        // 停止事件传播
        stopPropagation: function() {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if ( e && e.stopPropagation ) {
                e.stopPropagation();
            }
        },
        // 立即停止事件传播
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        }
    };
    var returnTrue = function() {
        return true;
    };
    var returnFalse = function() {
        return false;
    };
    var eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
    };
    function createProxy(event) {
        var proxy = $.extend({
            originalEvent: event
        }, event);
        $.each(eventMethods, function(name, predicate) {
            proxy[name] = function() {
                this[predicate] = returnTrue;
                if (name == "stopImmediatePropagation" || name == "stopPropagation") {
                    event.cancelBubble = true;
                    if (!event[name])
                        return;
                }
                return event[name].apply(event, arguments);
            };
            proxy[predicate] = returnFalse;
        });
        return proxy;
    }

    dQuery.fn.extend({
        bind:function(event, callback) {
            for (var i = 0; i < this.length; i++) {
                dQuery.event.add(this[i], event, callback);
            }
            return this;
        },
        // 解绑定：删除一个之前附加的事件句柄
        unbind: function(event, callback) {
            for (var i = 0; i < this.length; i++) {
                dQuery.event.remove(this[i], event, callback);
            }
            return this;
        },
        one:function(event, callback) {
            return this.each(function(i, element) {
                dQuery.event.add(this, event, callback, null, function(fn, type) {
                    return function() {
                        var result = fn.apply(element, arguments);
                        dQuery.event.remove(element, type, fn);
                        return result;
                    };
                });
            });
        },
        // 事件代理，调用live方法实现
        delegate: function(selector, event, callback) {
            for (var i = 0; i < this.length; i++) {
                var element = this[i];
                 dQuery.event.add(element, event, callback, selector, function(fn) {
                    return function(e) {
                        var evt, match = $(e.target).closest(selector, element).get(0);
                        if (match && match !== document) {
                            evt = $.extend(createProxy(e), {
                                currentTarget: match,
                                liveFired: element
                            });
                            return fn.apply(match, [evt].concat([].slice.call(arguments, 1)));
                        }
                    };
                });
            }
            return this;
        },
        // 删除事件代理，调用unbind或die实现
        undelegate:function(selector, event, callback) {
            for (var i = 0; i < this.length; i++) {
                dQuery.event.remove(this[i], event, callback, selector);
            }
            return this;
        },
        // 执行事件处理函数和默认行为
        on :function(event, selector, callback) {
            return selector === undefined || $.isFunction(selector) ? this.bind(event, selector) : this.delegate(selector, event, callback);
        },
        off:function(event, selector, callback) {
            return selector === undefined || $.isFunction(selector) ? this.unbind(event, selector) : this.undelegate(selector, event, callback);
        },
        trigger:function(event, data, props) {
            if (typeof event == 'string')
                event = $.Event(event, props);
            event.data = data;
            for (var i = 0; i < this.length; i++) {
                this[i].dispatchEvent(event);
            }
            return this;
        }
    });
})(window);