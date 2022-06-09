import { Component } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
// import fs from "fs";
declare var require: any;

const encoding = require("encoding-japanese");

const iconv = require("iconv-lite");

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	forms: FormGroup;

	// selectStrCodes = ["ASCII", "SHIFT-JIS", "UTF-8", "EUC-JP", "ISO2022"];

	constructor(private formBuilder: FormBuilder) {
		this.forms = this.formBuilder.group({
			// input: new FormControl(""),
			detectedStrCode: new FormControl(""),
			encodedStr: new FormControl(""),
			file: new FormControl(""),
		});
	}

	fillWidthOrHalf(text: string) {
		if (!text) return "--";
		return text.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/) ? "全角" : "半角";
	}

	crOrLf(text: string) {
		if (!text) return "--";
		if (text.match(/\r\n/)) {
			return "CRLF";
		} else if (text.match(/\n/)) {
			return "LF";
		} else if (text.match(/\r/)) {
			return "CR";
		}
	}

	isNum(text: any) {
		if (!text) return "--";
		return isNaN(text) ? "文字" : "数字";
	}

	// detectBuf() {
	// 	return encoding.detect(this.forms.value.input);
	// }

	// encoding() {
	// 	let strCode = this.detectBuf();
	// 	if (this.detectBuf() === "UNICODE") {
	// 		strCode = "UTF-8";
	// 	}
	// 	console.log(strCode, this.forms.value.selectStrCode);
	// 	const buf = iconv.encode(this.forms.value.input, strCode);
	// 	const str = iconv.decode(buf, this.forms.value.selectStrCode);
	// 	this.forms.get("encodedStr").setValue(str);
	// }

	encode() {
		const fileInput = document.getElementById("fileInput") as HTMLInputElement;
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			const str = e.target.result;
			console.log(str);
			const detectCode = encoding.detect(str);
			this.forms.get("detectedStrCode").setValue(detectCode);
			this.forms.get("encodedStr").setValue(iconv.decode(str, detectCode));
			console.log(this.forms.value.encodedStr);
		};

		fileReader.readAsBinaryString(fileInput.files[0]);
		//縺ゅ＞縺?∴縺
	}
}
