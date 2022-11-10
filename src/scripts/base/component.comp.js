export class Component extends HTMLElement {
    shadow;
    styleSheetPath;

    constructor(
        styleSheet = undefined
    ) {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        this.styleSheetPath = styleSheet;
        this.#setStyleSheet();
    }

    #setStyleSheet() {
        let imports;

        if (this.styleSheetPath == undefined) {
            imports = `
                @import '/styles/base.css';
            `;
        } else {
            imports = `
                @import '/styles/base.css';
                @import '${this.styleSheetPath}';
            `;
        }

        const style = document.createElement('style');
        style.innerHTML = imports;
        this.shadow.appendChild(style);
    }

    appendChild(child) {
        this.shadow.appendChild(child);
    }

    get innerHTML() {
        return this.shadow.innerHTML;
    }

    set innerHTML(html) {
        this.shadow.innerHTML = null;
        this.#setStyleSheet();
        this.shadow.innerHTML += html;
    }
}