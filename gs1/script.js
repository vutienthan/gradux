let workbook;

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fileUpload = document.getElementById('fileUpload').files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        workbook = XLSX.read(data, { type: 'array' });
        document.getElementById('form').style.display = 'block';
    };
    
    reader.readAsArrayBuffer(fileUpload);
});

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const sizeCountry = document.getElementById('sizeCountry').value;
    const startSize = parseInt(document.getElementById('startSize').value);
    const endSize = parseInt(document.getElementById('endSize').value);
    const tnvedCode = document.getElementById('tnvedCode').value;
    const isKit = document.getElementById('isKit').value;
    const trademark = document.getElementById('trademark').value;
    const model = document.getElementById('model').value;
    const productType = document.getElementById('productType').value;
    const color = document.getElementById('color').value;
    const targetGender = document.getElementById('targetGender').value;
    const composition = document.getElementById('composition').value;
    const regulationNumber = document.getElementById('regulationNumber').value;

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    let rowIndex = 4; // Assuming data starts from the fourth row
    for (let size = startSize; size <= endSize; size += 2) {
        const itemName = `${productType}, ${color}, ${targetGender}, размер ${size}, ${composition}`;
        sheet[`B${rowIndex}`] = { v: tnvedCode };
        sheet[`C${rowIndex}`] = { v: isKit };
        sheet[`D${rowIndex}`] = { v: itemName };
        sheet[`E${rowIndex}`] = { v: trademark };
        sheet[`F${rowIndex}`] = { v: model };
        sheet[`G${rowIndex}`] = { v: productType };
        sheet[`H${rowIndex}`] = { v: color };
        sheet[`I${rowIndex}`] = { v: targetGender };
        sheet[`J${rowIndex}`] = { v: sizeCountry };
        sheet[`K${rowIndex}`] = { v: size };
        sheet[`L${rowIndex}`] = { v: composition };
        sheet[`M${rowIndex}`] = { v: tnvedCode };
        sheet[`N${rowIndex}`] = { v: regulationNumber };
        rowIndex++;
    }

    // Generate new workbook and save it
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, sheet, 'Sheet1');
    const newFile = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });

    // Create a download link
    const blob = new Blob([newFile], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Updated_IMPORT_TNVED_6103(11).xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
