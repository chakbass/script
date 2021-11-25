// ==UserScript==
// @name         Youtube自动选择中文翻译字幕
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Youtube自动点击中文翻译字幕
// @author       大奶瓜
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(() => {
    const $ = el => document.querySelector(el)
    const $$ = el => document.querySelectorAll(el)
    const contains = (css, inner) => {
        let resultNode = null
        $$(css).forEach(e => e.innerText.trim().includes(inner) ? resultNode = e : '')
        return resultNode
    }
    const translate = () => {
        // 设置菜单按钮点击器
        const clickActive = (clickBtn, role = "menuitemradio",) => {
            const theNode = contains(`[role=${role}]`, clickBtn)
            theNode ? theNode.click() : ''
        }
        const ccBtnT = $('.ytp-subtitles-button[aria-pressed="true"][style=""]')
        const ccBtnF = $('.ytp-subtitles-button[aria-pressed="false"][style=""]')
        if (ccBtnT === null && ccBtnF === null) return
        // 字幕按钮
        if (ccBtnF) ccBtnF.click()
        // 设置按钮
        $('.ytp-settings-button').click()
        // 设置菜单按钮
        clickActive("字幕", "menuitem")
        clickActive("中文（简体）")
        clickActive("中文（中国）")
        clickActive("自动翻译")
        clickActive("中文（简体）")
    }
    // 创建一个循环定时器
    const intervalId = setInterval(() => {
        // 一直循环，一直到找到video元素为止，然后把事件添加上去
        const videoNode = $('video')
        if (videoNode) {
            clearInterval(intervalId)
            translate()
            videoNode.addEventListener('loadeddata', translate, false)
        }
    }, 500)
})()