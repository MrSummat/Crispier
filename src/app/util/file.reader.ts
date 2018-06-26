import * as XLSX from 'xlsx';

export class FileParser {

    constructor() { }

    private static sheetToJson(file: File): Promise<{}[]> {
        const temporaryFileReader = new FileReader();

        return new Promise<{}[]>((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            temporaryFileReader.onload = () => {
                let arrayBuffer = temporaryFileReader.result;
                var data = new Uint8Array(arrayBuffer);
                var arr = new Array();
                for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
                var workbook = XLSX.read(bstr, { type: "binary" });
                var first_sheet_name = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[first_sheet_name];
                resolve(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
            };
            
            temporaryFileReader.readAsArrayBuffer(file);
        });
    }

    public static parseExcel(file: File): Promise<{}[]> {
        return this.sheetToJson(file)
    }

}