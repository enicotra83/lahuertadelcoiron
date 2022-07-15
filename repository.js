const { google } = require('googleapis')
const auth = new google.auth.GoogleAuth ({
  keyFile: './archivosDeConfiguracion/credenciales.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth: auth })

// forma anterior para conectar con la BD en google spreadsheet 

// const oAuth2Client = new google.auth.OAuth2(
//   // saco los datos de credentials.json
//   '272696143737-ptnj4pbcgi8qai5526qpe4oliknst9sn.apps.googleusercontent.com',
//   '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',
//   'urn:ietf:wg:oauth:2.0:oob'
// )
// oAuth2Client.setCredentials({
//   // saco los datos de token.json
//   access_token:
//     'ya29.a0AVA9y1sHm3vgIVk_KAmKeTDlgatKDcs8Xh3RmNFdxJwdqAvV7HI_kbisFNK3vNzxuyl74Yh3RtBOIR4SsdGih-1nE_aw6d18xVYvh0pCFdEze_7L-cB6STj2oslwRPdqBU3jWCxo-U6fwDIm5OUvtJlVJovc',
//   refresh_token:
//     '1//0h5ie_tNbjlyNCgYIARAAGBESNwF-L9IrcPXiOJvWxw7aY0aDIvSU8Nu7tUKGOX13bRnpwsFqED9jLTevqUd7XPT1OgZjq9OeucI',
//   scope: 'https://www.googleapis.com/auth/spreadsheets',
//   token_type: 'Bearer',
//   expiry_date: 1657565450404,
// })

// const sheets = google.sheets({ version: 'v4', auth: oAuth2Client })

async function read() {
  const response = await sheets.spreadsheets.values.get({
    //saco el id de la URL del archivo de la hoja de calculo
    spreadsheetId: '1Lrq_82WPaiTpCcmItxdkCTKiV9GaTM2G0Vk2lqbDeWY',
    // cambio el rango por 'NombreEtiquetaHoja!rango' .. cambio el nombre de la hoja por Productos
    range: 'Productos!A2:F',
  })

  const rows = response.data.values
  const productos = rows.map((row) => ({
    id: +row[0],
    name: row[1],
    description: row[2],
    price: +row[3],
    image: row[4],
    stock: +row[5],
  }))
  //console.log(productos)
  return productos
}

async function write(productos) {
  let values = productos.map((p) => [
    p.id,
    p.name,
    p.description,
    p.price,
    p.image,
    p.stock,
  ])

  const resource = {
    values,
  }
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: '1Lrq_82WPaiTpCcmItxdkCTKiV9GaTM2G0Vk2lqbDeWY',
    range: 'Productos!A2:F',
    valueInputOption: 'RAW',
    resource,
  })
  console.log(result.updatedCells)
}

// async function readAndWrite(){
//     const productos = await read()
//     productos[0].stock = 20
//     await write (productos)
// }

// readAndWrite()

module.exports = {
  read,
  write,
}
