const fs = require('fs');
const beatify = require('beautify');
const multiparty = require('multiparty');
const path = require('path');

const { HTML, CSS, JavaScript, TypeScript, JSON } = require('../utils/fileTypes');

exports.beautify = (req, res) => {
    var form = multiparty.Form();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            const result = {
                status: false,
                data: {
                    msg: "Error!",
                    type: "error",
                },
            };
            return res.json(result);
        }

        if (files) {
            var uploadedFile;
            if (files.file && files.file.length > 0)
                uploadedFile = files.file[0];
            else {
                const reuslt = {
                    status: false,
                    data: {
                        msg: 'No file, Select One!',
                        type: 'error'
                    },
                };
                return res.json(result);
            }

            const fileTypes = [
                'html',
                'css',
                'js',
                'json',
                'ts',
                'md',
            ];

            const fileType = uploadedFile.originalFilename.split('.');
            if (!fileTypes.includes(fileType[fileType.length - 1])) {
                const result = {
                    status: false,
                    data: {
                        msg: 'Incorrect file type, select correct file!',
                        type: 'error',
                    },
                };
                return res.json(result);
            }

            const tempPath = uploadedFile.path;
            const targetPath = path.join(__dirname, 'uploads', uploadedFile.originalFilename);

            // Move the file to the uploads directory
            fs.rename(tempPath, targetPath, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error saving file' });
                }

                var fileText = fs.readFileSync('/uploads/' + uploadedFile.originalFilename);
                var beautified = "";
                switch (fileType) {
                    case HTML:
                        beautified = beautify(fileText, { format: HTML });
                        break;
                    case CSS:
                        beautified = beautify(fileText, { format: CSS });
                        break;
                    case JavaScript:
                        beautified = beautify(fileText, { format: JavaScript });
                        break;
                    case TypeScript:
                        beautified = beautify(fileText, { format: TypeScript });
                        break;
                    case JSON:
                        beautified = beautify(fileText, { format: JSON });
                        break;
                    default:
                        break;
                }
                console.log(beautified);
                res.json()
                res.status(200).json({ message: 'File uploaded successfully!' });
            });
        }
    })
}