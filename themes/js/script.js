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

$(`#accordion-info`).append(`
	<div id="letters-bar">
		<div style="font-size: 19px;"><b>کلمه</b></div>
		<div style="font-size: 19px;"><b>تکرار</b></div>
	</div>
	<hr class="not-include">
`);

function onlyUnique(value, index, array) {
	return array.indexOf(value) === index;
}

function checkDir(text) {
	const ch = text.charCodeAt(0);
	if(ch >= 65 && ch <= 122)
		return true;
	return false;
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

function totalWords(text) {
	text = text.replace(/\s+/g, ` `);
	let words = text.split(` `);
	words = words.filter(onlyUnique);
	words = words.filter(function(e) {
		return e;
	});
	for(let i = 0; i < words.length; i++) {
		$(`#accordion-info`).append(`
			<div>
				<div id="word-${i}">" ${words[i]} "</div>
				<div id="total-word-${i}" class="words"></div>
			</div>
			<hr>
		`);
	}
	const total = [];
	for(let i = 0; i < words.length; i++) {
		let re = new RegExp(words[i],"g");
		console.log(text);
		total[i] = text.match(re);
		$(`#total-word-${i}`).html(total[i].length);
	}
}

function wordsFunction(text) {
	text = text.replace(/\s+/g, ` `);
	const words = text.split(` `);
	return words.length;
}

$(`#analyze`).click(function() {
	const text = $(`#text`).val();
	const textLength = text.length;
	const textExSpace = text.split(` `);
	const sentences = text.match(/\./g);
	const numbersEn = text.match(/[0-9]/g);
	const numbersFa = text.match(/[۰-۹]/g);
	const spaces = text.match(/ /g);
	$(`#extracted`).click();
	$(`#text-length`).html(textLength);
	$(`#text-ex-space`).html(textLength - textExSpace.length + 1);
	$(`#words`).html(wordsFunction(text));
	$(`#sentences`).html(sentences == undefined ? 0 : sentences.length);
	$(`#numbers-en`).html(numbersEn == undefined ? 0 : numbersEn.length);
	$(`#numbers-fa`).html(numbersFa == undefined ? 0 : numbersFa.length);
	$(`#space`).html(spaces == undefined ? 0 : spaces.length);
	totalLetterFa(text);
	totalLetterEn(text);
	totalWords(text);
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

$(`#text`).on('input', function() {
	if(checkDir($(this).val()))
		$(`#text`).css(`direction`, `ltr`);
	else
		$(`#text`).css(`direction`, `rtl`);
});