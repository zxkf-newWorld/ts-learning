/*
 * @Author: hp
 * @Date: 2021-02-28 23:23:14
 * @LastEditTime: 2021-03-02 00:03:07
 * @LastEditors: your name
 * @Description: 入口文件
 * @FilePath: /proj/src/main.ts
 */
import {sayHello} from './greet'
function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName)
    elt.innerHTML = sayHello(name)
}
showHello("greeting", "TypeScripts")