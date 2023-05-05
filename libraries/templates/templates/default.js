/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// Register a templates definition set named "default".
CKEDITOR.addTemplates( 'default', {
	// The name of sub folder which hold the shortcut preview images of the
	// templates.
	imagesPath: CKEDITOR.getUrl( CKEDITOR.plugins.getPath( 'templates' ) + 'templates/images/' ),

	// The templates definitions.
	templates: [ 
	{
		title: 'Ficha de ensamble',
		image: 'ficha_de_ensamble.png',
		description: 'Ficha técnica de ensamble con imagen, numeros de parte.',
		html: '<table border="0" cellpadding="1" cellspacing="1" style="width: 100%;">' +
			'	<tbody>' +
			'		<tr>' +
			'			<td>Cable</td>' +
			'			<td colspan="2"><img alt="cable" data-align="center" data-entity-type="file" data-entity-uuid="ddad08ff-9ca5-47a4-9d79-bc1ad7749c0e" height="55" src="/sites/default/files/inline-images/CABLE%20ETHERNET%20APLICACIONES%20ESTACIONARIAS_3.png" width="240" />' +
			'			</td>' +
			'		</tr>' +
			'		<tr>' +
			'			<td>Cable quality</td>' +
			'			<td>Part NO.</td>' +
			'			<td>Number of cores and conductor nominal cross section</td>' +
			'		</tr>' +
			'		<tr>' +
			'			<td>&nbsp;</td>' +
			'			<td>&nbsp;</td>' +
			'			<td>&nbsp;</td>' +
			'		</tr>' +
			'	</tbody>' +
			'</table>'
	},
	{
		title: 'Image and Title',
		image: 'template1.gif',
		description: 'One main image with a title and text that surround the image.',
		html: '<h3>' +
			// Use src=" " so image is not filtered out by the editor as incorrect (src is required).
			'<img src=" " alt="" style="margin-right: 10px" height="100" width="100" align="left" />' +
			'Type the title here' +
			'</h3>' +
			'<p>' +
			'Type the text here' +
			'</p>'
	},
	{
		title: 'Strange Template',
		image: 'template2.gif',
		description: 'A template that defines two columns, each one with a title, and some text.',
		html: '<table cellspacing="0" cellpadding="0" style="width:100%" border="0">' +
			'<tr>' +
				'<td style="width:50%">' +
					'<h3>Title 1</h3>' +
				'</td>' +
				'<td></td>' +
				'<td style="width:50%">' +
					'<h3>Title 2</h3>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td>' +
					'Text 1' +
				'</td>' +
				'<td></td>' +
				'<td>' +
					'Text 2' +
				'</td>' +
			'</tr>' +
			'</table>' +
			'<p>' +
			'More text goes here.' +
			'</p>'
	},
	{
		title: 'Text and Table',
		image: 'template3.gif',
		description: 'A title with some text and a table.',
		html: '<div style="width: 80%">' +
			'<h3>' +
				'Title goes here' +
			'</h3>' +
			'<table style="width:150px;float: right" cellspacing="0" cellpadding="0" border="1">' +
				'<caption style="border:solid 1px black">' +
					'<strong>Table title</strong>' +
				'</caption>' +
				'<tr>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
				'</tr>' +
				'<tr>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
				'</tr>' +
				'<tr>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
					'<td>&nbsp;</td>' +
				'</tr>' +
			'</table>' +
			'<p>' +
				'Type the text here' +
			'</p>' +
			'</div>'
	} ]
} );
