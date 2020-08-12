const $ = (id) => document.getElementById(id);

function val(id) {
    let el = $(id);
    return el.value;
}

function toEvaluableTemplate(templateString) {
    return '`' + templateString + '`';
}

function toggle() {
    $('nonpaymentDateRaw').disabled = !$('type1').checked;
}

function dateToString(date) {
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function generate() {
    const tpl1 = toEvaluableTemplate($('tpl1').innerHTML);
    const tpl2 = toEvaluableTemplate($('tpl2').innerHTML);

    const startDateRaw = new Date(val('startDateRaw'));
    const endDateRaw = new Date(val('endDateRaw'));
    let delayDateRaw = new Date(endDateRaw.getTime());
    delayDateRaw.setDate(endDateRaw.getDate() + 15);
    const nonpaymentDateRaw = new Date(val('nonpaymentDateRaw'));

    const typesArray = [];
    ['type1', 'type2', 'type3'].forEach((id) => {
        if ($(id).checked) typesArray.push($(id).value);
    });

    const total = numberWithCommas(val('total'));
    const work = val('work');
    const startDate = dateToString(startDateRaw);
    const endDate = dateToString(endDateRaw);
    const delayDate = dateToString(delayDateRaw);
    const nonpaymentDate = ($('type1').checked && val('nonpaymentDateRaw') !== '')? `${dateToString(nonpaymentDateRaw)}부터의 ` : '';
    const types = typesArray.slice(0, -1).join(', ') + ((typesArray.length > 1)? ' 및 ' : '') + typesArray[typesArray.length - 1];
    
    $('out1').innerHTML = eval(tpl1);
    $('out2').innerHTML = eval(tpl2);
}