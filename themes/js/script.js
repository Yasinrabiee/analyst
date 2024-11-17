const lettersFa = ['آ', 'ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی' ];
const lettersEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

for(let i = 0; i < lettersFa.length; i++) {
	$(`#accordion-info`).append(`
			<div>
				<div id="letter-${i}">" ${lettersFa[i]} "</div>
				<div id="total-letter-${i}"></div>
			</div>
	`);
}

function totalLetter(text) {
	const total = [];
	for(let i = 0; i < lettersFa.length; i++) {
		let re = new RegExp(lettersFa[i], "g");
		total[i] = text.match(re);	
		total[i] = total[i] !== null ? total[i].length : total[i];
		$(`#total-letter-${i}`).html(total[i] !== null ? total[i] : 0);
	}
}

$(`#analyze`).click(function() {
	const text = $(`#text`).val();
	const textLength = text.length;
	const textExSpace = text.split(` `);
	const sentences = text.match(/\./g);
	const numbersEn = text.match(/[1-9]/g);
	const numbersFa = text.match(/[۱-۹]/g);
	const spaces = text.match(/ /g);
	$(`#extracted`).click();
	$(`#text-length`).html(textLength);
	$(`#text-ex-space`).html(textLength - textExSpace.length + 1);
	$(`#words`).html(textExSpace.length);
	$(`#sentences`).html(sentences == undefined ? 0 : sentences.length);
	$(`#numbers-en`).html(numbersEn == undefined ? 0 : numbersEn.length);
	$(`#numbers-fa`).html(numbersFa == undefined ? 0 : numbersFa.length);
	$(`#space`).html(spaces == undefined ? 0 : spaces.length);
	totalLetter(text);
	$(`html`).animate({
		scrollTop: $(`#info-bar`).position().top
	}, 750);
});