"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingProcess = void 0;
class ReadingProcess {
    constructor(state, replacements) {
        this.state = state;
        this.replacements = replacements;
    }
    onReadingTemplate(content) {
        if (this.state.isReadingContent) {
            this.state.content.push(content[this.state.cpt]);
        }
    }
    onReadingTemplateStart() {
        if (!this.state.isReadingContent && (this.state.analyser === "\n")) {
            this.state.analyser = "";
            return true;
        }
        else if (this.state.analyser.length && /\`/.test(this.state.analyser[0])) {
            this.decorateNewState();
        }
        return false;
    }
    onStopReadingTemplate() {
        if (this.state.isReadingContent && /\`\`\`$/.test(this.state.analyser)) {
            this.state.isReadingContent = false;
            this.replaceTemplateByReadContent();
            this.state.content = [];
            this.fillPlaceHolders();
            this.state.descriptions.push(this.state.template);
            this.state.analyser = "";
        }
        ;
    }
    replaceTemplateByReadContent() {
        this.state.template.template =
            this.state.content
                .join("")
                .replace('\n\`\`\`', '');
    }
    fillPlaceHolders() {
        this.replacements.forEach((value, key) => {
            this.state.template.template =
                this.state.template.template.replace(new RegExp(key, "g"), value);
        });
    }
    decorateNewState() {
        let m = /\`\`\`(\w+)\n/.exec(this.state.analyser);
        if (m) {
            this.state.analyser = "";
            this.state.template.file += `.${m[1]}`;
            this.state.isReadingContent = true;
        }
    }
}
exports.ReadingProcess = ReadingProcess;
//# sourceMappingURL=analyseProcess.js.map