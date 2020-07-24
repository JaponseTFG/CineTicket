const keys = require("../config/keys");
const path = require('path');
const PdfPrinter = require('pdfmake');
const fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  }
};
const printer = new PdfPrinter(fonts);
const fs = require('fs');

const makePdf = async (entradaConfig) => {
  try {
        var docDefinition = {
          content: [
      	    {
      			text: '.                                                              ',
      			style: 'header',
      			fontSize: 40,
      			bold: true,
      		    decoration: 'underline',
      		    margin :[-100,0,0,0],
      			width: 500,
      		},
      		 {
      			text: '\nInformacion de tus entradas: \n\n',
      			style: 'header',
      			fontSize: 20,
      			bold: true
      		},
      		{
      			columns: [
      				{   width: 120,
          				text: [
              		    {text: '| ', fontSize: 25, bold: true },
              				{text: 'Película:  \n', fontSize: 15},
              				{text: '| ', fontSize: 25, bold: true },
              				{text: 'Sala:  \n', fontSize: 15},
              				{text: '| ', fontSize: 25, bold: true },
              				{text: 'Fecha:  \n', fontSize: 15},

              				{text: '| ', fontSize: 25, bold: true },
              				{text: 'Butacas:  \n', fontSize: 15},
          		        ]
      				},
      				{
                width: 500,
      					text: [
      					    {text: ' ', fontSize: 25, bold: true },
              				{text: entradaConfig.titulo_pelicula+" \n"  , fontSize: 15, bold: true},
              			    {text: ' ', fontSize: 25, bold: true },
              				{text: entradaConfig.nombre_sala+"\n"  , fontSize: 15, bold: true},
              			    {text: ' ', fontSize: 25, bold: true },
              				{text: entradaConfig.str_fecha+"\n"  , fontSize: 15, bold: true},
              				{text: ' ', fontSize: 25, bold: true },
              				{text: entradaConfig.str_butacas+"\n"  , fontSize: 15, bold: true},
          		        ]
      				},
      			]
      		},
      		 {
      			text: '.                                                              ',
      			style: 'header',
      			fontSize: 40,
      			bold: true,
      		    decoration: 'underline',
      		    margin :[-100,0,0,0],
      			width: 500,
      		},
      		{
      			text: '\n\n',
      			style: 'header',
      			fontSize: 30,
      			bold: true
      		},
      	    {
      		    alignment: 'center',
      		    qr: entradaConfig.str_id+"", fit: '180' 	,width: 400
      	    },
      	    {
      		    alignment: 'center',
      		    text: entradaConfig.str_id+"",
      	    }

      	],
      	footer: "| "+entradaConfig.str_fecha_compra,
          defaultStyle: {
            font: 'Courier'
          }
        };

        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        var filename = entradaConfig.filename;
        var dir_path = path.resolve(__dirname,'..','uploads','entradas',filename+".pdf");
        var writeStream = fs.createWriteStream(dir_path);
        pdfDoc.pipe(fs.createWriteStream(dir_path));
        await pdfDoc.end();

        return dir_path;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { makePdf: makePdf };
