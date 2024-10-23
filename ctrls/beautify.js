const fs = require('fs');
const beautify = require('beautify');
const multiparty = require('multiparty');
const path = require('path');

// Assuming these constants are defined correctly in '../utils/fileTypes'
const { HTML, CSS, JavaScript, TypeScript, JSON } = require('../utils/fileTypes');

exports.beautify = (req, res) => {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return res.json({
                status: false,
                data: {
                    msg: "Error parsing the file!",
                    type: "error",
                },
            });
        }

        if (files && files.file && files.file.length > 0) {
            const uploadedFile = files.file[0];
            console.log('Uploaded file:', uploadedFile);

            const fileTypes = ['html', 'css', 'js', 'json', 'ts', 'md'];
            const fileType = uploadedFile.originalFilename.split('.').pop().toLowerCase();

            if (!fileTypes.includes(fileType)) {
                return res.json({
                    status: false,
                    data: {
                        msg: 'Incorrect file type, select a correct file!',
                        type: 'error',
                    },
                });
            }

            const tempPath = uploadedFile.path;
            const targetPath = path.join(__dirname, 'uploads', uploadedFile.originalFilename);

            // Use fs.copyFile to move the file
            fs.copyFile(tempPath, targetPath, (copyErr) => {
                if (copyErr) {
                    return res.status(500).json({ error: 'Error copying file' });
                }

                // Delete the original temp file
                fs.unlink(tempPath, (unlinkErr) => {
                    if (unlinkErr) {
                        return res.status(500).json({ error: 'Error deleting temp file' });
                    }

                    // Read the file from the uploads directory
                    const fileText = fs.readFileSync(targetPath, 'utf8');
                    let beautified = "";

                    switch (fileType) {
                        case 'html':
                            beautified = beautify(fileText, { format: 'html' });
                            break;
                        case 'css':
                            beautified = beautify(fileText, { format: 'css' });
                            break;
                        case 'js':
                            beautified = beautify(fileText, { format: 'js' });
                            break;
                        case 'ts':
                            beautified = beautify(fileText, { format: 'ts' });
                            break;
                        case 'json':
                            beautified = beautify(fileText, { format: 'json' });
                            break;
                        default:
                            return res.json({
                                status: false,
                                data: {
                                    msg: 'Unsupported file type!',
                                    type: 'error',
                                },
                            });
                    }

                    // Respond with the beautified code
                    res.json({
                        status: true,
                        data: {
                            beautified,
                            msg: 'File beautified successfully!',
                            type: 'success',
                        },
                    });
                });
            });
        } else {
            return res.json({
                status: false,
                data: {
                    msg: 'No file, please select one!',
                    type: 'error',
                },
            });
        }
    });
};