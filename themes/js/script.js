const lettersFa = ['آ', 'ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی' ];
const lettersEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

for(let i = 0; i < lettersFa.length; i++) {
	$(`#accordion-info`).append(`
			<div>
				<div id="letter-${i}">" ${lettersFa[i]} "</div>
				<div id="total-letter-${i}" class="letters"></div>
			</div>
			<hr>
	`);
}

for(let i = 0; i < lettersEn.length; i++) {
	$(`#accordion-info`).append(`
			<div>
				<div id="letter-en-${i}">" ${lettersEn[i]} "</div>
				<div id="total-letter-en-${i}" class="letters"></div>
			</div>
			<hr>
	`);
}

function totalLetterFa(text) {
	const total = [];
	for(let i = 0; i < lettersFa.length; i++) {
		let re = new RegExp(lettersFa[i], "g");
		total[i] = text.match(re);	
		total[i] = total[i] !== null ? total[i].length : total[i];
		$(`#total-letter-${i}`).html(total[i] !== null ? total[i] : 0);
	}
}

function totalLetterEn(text) {
	const total = [];
	for(let i = 0; i < lettersEn.length; i++) {
		let re = new RegExp(lettersEn[i], "g");
		total[i] = text.match(re);	
		total[i] = total[i] !== null ? total[i].length : total[i];
		$(`#total-letter-en-${i}`).html(total[i] !== null ? total[i] : 0);
	}
}

$(`#analyze`).click(function() {
	const text = $(`#text`).val();
	const textLength = text.length;
	const textExSpace = text.split(` `);
	const sentences = text.match(/\./g);
	const numbersEn = text.match(/[0-9]/g);
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
	totalLetterFa(text);
	totalLetterEn(text);
	$(`html`).animate({
		scrollTop: $(`#info-bar`).position().top
	}, 500);
	document.querySelectorAll(`.letters`).forEach(function(item) {
		if(item.innerHTML === `0`) {
			item.parentNode.style.display = `none`;
			item.parentNode.nextElementSibling.style.display = `none`;
		}
	});
});
