"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Request_instances, _Request_api, _Request_apis, _Request_axiosOptions, _Request_prefix, _Request_processFix, _Request_fail, _Request_axios, _Request_getAuthOptions, _Request_getAxios, _Request_createAxios;
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = void 0;
const axios_1 = __importDefault(require("axios"));
function isFunction(functionToCheck) {
    return {}.toString().call(functionToCheck) == '[object Function]';
}
function isUndefined(obj) {
    return typeof obj === 'undefined';
}
/**
 * ??????????????????
 * todo???
 *  1. ??????????????????????????????????????????????????? ?????????
 *  2. ?????????????????????????????????????????????????????? ?????????
 *  3. ??????/???????????????????????????????????????????????????????????????????????????????????????????????? ?????????
 *  4. ??????????????????????????????????????????????????????????????????
 *  5. ?????????????????????????????????
 *
 *  ?????????????????????
 *  import gdIo from 'gd-io'
 *  gdIo.init({
 *    api: 'http://xxxxxx',
 *    prefix: '',
 *  })
 */
function splitNames(name) {
    return name.split('.');
}
var method;
(function (method) {
    method["get"] = "get";
    method["post"] = "post";
    method["delete"] = "delete";
    method["opinion"] = "opinion";
    method["put"] = "put";
})(method = exports.method || (exports.method = {}));
/**
 * ????????????
```
const request = new Request({
    // ??????????????????????????????,???api????????????????????????api???????????????????????????????????????????????????????????????api?????????
    api: [{
        url: 'http://',
        when: () => {},
    }],
});
```
 */
class Request {
    constructor({ api = '', // ??????????????????????????????
    axiosOptions = {}, prefix, // ??????????????????
    processFix, // ??????????????????
    fail, // ??????????????????
    authOptions = () => { }, // ????????????
    useApiIndex, }) {
        _Request_instances.add(this);
        _Request_api.set(this, ''); // ??????api??????
        _Request_apis.set(this, []); // ??????api??????
        _Request_axiosOptions.set(this, {}); // headers
        _Request_prefix.set(this, void 0); // ????????????????????????
        _Request_processFix.set(this, void 0); // ????????????????????????
        _Request_fail.set(this, void 0); // ????????????????????????
        this.io = {}; // ??????io????????????
        _Request_axios.set(this, {});
        _Request_getAuthOptions.set(this, {}); // ??????????????????
        __classPrivateFieldSet(this, _Request_axiosOptions, axiosOptions, "f");
        __classPrivateFieldSet(this, _Request_prefix, prefix, "f");
        __classPrivateFieldSet(this, _Request_processFix, processFix, "f");
        __classPrivateFieldSet(this, _Request_fail, fail, "f");
        __classPrivateFieldSet(this, _Request_getAuthOptions, isFunction(authOptions) ? authOptions : () => authOptions, "f");
        // ???api????????????????????????api????????????????????????????????????????????????
        __classPrivateFieldSet(this, _Request_apis, Array.isArray(api) ? api : [{ url: api, when: () => true }], "f");
        if (!isUndefined(useApiIndex)) {
            __classPrivateFieldSet(this, _Request_api, __classPrivateFieldGet(this, _Request_apis, "f")[useApiIndex].url, "f");
        }
        else {
            Array.isArray(api)
                ? [...api].reverse().forEach((o) => {
                    o.when instanceof Function
                        ? o.when() && (__classPrivateFieldSet(this, _Request_api, o.url, "f"))
                        : o.when && (__classPrivateFieldSet(this, _Request_api, o.url, "f"));
                })
                : (__classPrivateFieldSet(this, _Request_api, api, "f"));
        }
        // ??????axios
        __classPrivateFieldSet(this, _Request_axios, axios_1.default.create(Object.assign({ baseURL: __classPrivateFieldGet(this, _Request_api, "f") }, __classPrivateFieldGet(this, _Request_axiosOptions, "f"))), "f");
        __classPrivateFieldSet(this, _Request_axios, __classPrivateFieldGet(this, _Request_instances, "m", _Request_createAxios).call(this), "f");
    }
    /**
     * ??????API
     */
    create(name, modules) {
        const hasModules = Array.isArray(modules);
        if (!name && !hasModules && !modules.name) {
            throw Error('name???modules.name ?????????????????????');
        }
        (!hasModules ? [modules] : modules).forEach((module) => {
            let path = this.io;
            const names = splitNames(name);
            names.forEach((o, i) => {
                if (!path[o]) {
                    path = path[o] =
                        names.length - 1 === i && !module.name ? __classPrivateFieldGet(this, _Request_instances, "m", _Request_getAxios).call(this, module) : {};
                }
                else {
                    path = path[o];
                }
            });
            if (module.name) {
                const moduleNames = splitNames(module.name);
                moduleNames.forEach((o, i) => {
                    if (!path[o]) {
                        path = path[o] = moduleNames.length - 1 === i ? __classPrivateFieldGet(this, _Request_instances, "m", _Request_getAxios).call(this, module) : {};
                    }
                    else {
                        path = path[o];
                    }
                });
            }
        });
    }
}
_Request_api = new WeakMap(), _Request_apis = new WeakMap(), _Request_axiosOptions = new WeakMap(), _Request_prefix = new WeakMap(), _Request_processFix = new WeakMap(), _Request_fail = new WeakMap(), _Request_axios = new WeakMap(), _Request_getAuthOptions = new WeakMap(), _Request_instances = new WeakSet(), _Request_getAxios = function _Request_getAxios(module) {
    return (data, configs) => __awaiter(this, void 0, void 0, function* () {
        let content;
        try {
            // ????????????
            const throwError = (error) => {
                throw Error(error || 'Permission denied');
                return '';
            };
            // ????????????????????????
            data =
                (__classPrivateFieldGet(this, _Request_prefix, "f")
                    ? __classPrivateFieldGet(this, _Request_prefix, "f").call(this, data, {
                        data,
                        reject: throwError,
                        global: this,
                        module,
                        authOptions: __classPrivateFieldGet(this, _Request_getAuthOptions, "f").call(this),
                    })
                    : data) || data;
            // ????????????????????????
            data =
                (module.prefix
                    ? module.prefix(data, {
                        data,
                        reject: throwError,
                        global: this,
                        module,
                        authOptions: __classPrivateFieldGet(this, _Request_getAuthOptions, "f").call(this),
                    })
                    : data) || data;
            // url??????
            let url = isUndefined(module.useApiIndex)
                ? module.url
                : `${__classPrivateFieldGet(this, _Request_apis, "f")[module.useApiIndex].url}${module.url}`;
            if ([method.get, method.delete].includes(module.method))
                url = `${url}?${data ? Object.entries(data).map((v) => v.join('=')).join('&') : ''}`;
            // ???????????????
            content = yield __classPrivateFieldGet(this, _Request_axios, "f")[method[module.method]](url, data, configs);
            // ????????????????????????
            content.data = module.processFix
                ? module.processFix(content.data, content)
                : content.data;
            // ????????????????????????
            content.data = __classPrivateFieldGet(this, _Request_processFix, "f")
                ? __classPrivateFieldGet(this, _Request_processFix, "f").call(this, content.data, content)
                : content.data;
        }
        catch (error) {
            // ????????????????????????
            content = module.fail ? module.fail(error) : error;
            // ????????????????????????
            content = __classPrivateFieldGet(this, _Request_fail, "f") ? __classPrivateFieldGet(this, _Request_fail, "f").call(this, error) : error;
        }
        return content === null || content === void 0 ? void 0 : content.data;
    });
}, _Request_createAxios = function _Request_createAxios(config = {}) {
    return axios_1.default.create(Object.assign(Object.assign({ baseURL: __classPrivateFieldGet(this, _Request_api, "f") }, __classPrivateFieldGet(this, _Request_axiosOptions, "f")), config));
};
exports.default = Request;
