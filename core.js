(function () {
    let MIXINS = {
        buildTemplate: function (str, data) {
            return str.replace(/\$\{([\w]+)\}/g, function (source, match) {
                if (data[match] || data[match] === 0) {
                    return data[match]
                }
            });
        },
        createNodesFromTemplate: function (template) {
            let div = document.createElement('div');
            div.innerHTML = template;
            return Array.from(div.childNodes);
        },
        appendTemplate: function (element, template) {
            let childNodes = MIXINS.createNodesFromTemplate(template);
            for (let i = 0; i < childNodes.length; i++) {
                element.appendChild(childNodes[i]);
            }
            return childNodes;
        },
        passiveEvent: function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        pickElements: function (selector) {
            let e = selector;
            if (e) {
                if (typeof e === "string") {
                    e = document.querySelectorAll(e);
                }
                if (!(e.length >= 0)) {
                    e = [e];
                }
                return e;
            }
            return [];
        },
        selectOnFocus: function (e) {
            let t = e.target;
            t.setSelectionRange(0, t.value.length);
        },
        getPastedText: function (e) {
            let clipboardData = e.clipboardData || window.clipboardData;
            return clipboardData.getData && clipboardData.getData('text/plain');
        },
        preventLetters: function (e) {
            let keyCode = e.keyCode;
            let check = !(keyCode === 8 || keyCode === 9 || keyCode === 46 || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105));
            if (check) {
                MIXINS.passiveEvent(e);
            }
            return check;
        }
    };
    window.MIXINS = MIXINS;
})();

(function () {
    const Naggetsovna = {
        krutki: 30,
        addKrutki: function (number) {
            Naggetsovna.krutki += number;
            updateView();
        },
    }
    function updateView(){

    }
    window.Naggetsovna = Naggetsovna
})();