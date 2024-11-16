$(`#analyze`).click(function() {
	const text = $(`#text`).val();
	const textLength = text.length;
	const textExSpace = text.split(` `);
	const sentences = text.match(/\./g);
	const numbersEn = text.match(/[1-9]/g);
	const numbersFa = text.match(/[۱-۹]/g);
	const spaces = text.match(/ /g);
	$(`#extracted`).click();
	// $(`#collapseTwo`).addClass(`show`);
	$(`#text-length`).html(textLength);
	$(`#text-ex-space`).html(textLength - textExSpace.length + 1);
	console.log(textExSpace);
	$(`#words`).html(textExSpace.length);
	$(`#sentences`).html(sentences == undefined ? 0 : sentences.length);
	$(`#numbers-en`).html(numbersEn == undefined ? 0 : numbersEn.length);
	$(`#numbers-fa`).html(numbersFa == undefined ? 0 : numbersFa.length);
	$(`#space`).html(spaces == undefined ? 0 : spaces.length);
});