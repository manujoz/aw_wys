<?php

// ------------------------------ //
// ------------------------------ //
// ----->>> CONEXIÓN FTP <<<----- //
// ------------------------------ //
// ------------------------------ //

require_once( "ftp_connect.php" );

// --------------------------- //
// --------------------------- //
// ----->>> FUNCIONES <<<----- //
// --------------------------- //
// --------------------------- //

//  - - - - - - - - - - - - - - - - - - - - 
//  CLASE RESPONSE
//  - - - - - - - - - - - - - - - - - - - - 

class Response {
	public $estado;
	public $path;
	public $alerta;
}

$OBJ_RESPONSE = new Response();

//  - - - - - - - - - - - - - - - - - - - - 
//  CREA IMAGE PATH
//  - - - - - - - - - - - - - - - - - - - - 

function image_path( $path, $ext ) {
	$name = mt_rand();
	while(file_exists( $path . "" . $name . "." . $ext )){
		$name = mt_rand();
	}

	return $path . "" . $name . "." . $ext;
}

// --------------------------------- //
// --------------------------------- //
// ----->>> POSTEAMOS DATOS <<<----- //
// --------------------------------- //
// --------------------------------- //

$file = $_FILES[ "img" ];

$altoancho = GetImageSize( $file[ "tmp_name" ] );
$ancho = $altoancho[ 0 ];
$alto = $altoancho[ 1 ];

// --------------------------------------------------- //
// --------------------------------------------------- //
// ----->>> GUARDAMOS LA IMAGEN SEGÚN EL TIPO <<<----- //
// --------------------------------------------------- //
// --------------------------------------------------- //

switch ( $file[ 'type' ] ) {
	//  - - - - - - - - - - - - - - - - - - - - 
	//  IMAGEN JPG
	//  - - - - - - - - - - - - - - - - - - - - 

	case 'image/jpeg':
		$ext = "jpg";
		$image_path = image_path( $path, $ext );

		$resource = imagecreatefromjpeg( $file[ "tmp_name" ] );
		$thumb = imagecreatetruecolor( $ancho, $alto );
		$colorFondo = imagecolorallocate( $thumb, 255, 255, 255 );

		imagefilledrectangle( $thumb, 0, 0, $ancho, $alto, $colorFondo );
		imagecopyresampled( $thumb, $resource, 0, 0, 0, 0, $ancho, $alto, $altoancho[ 0 ], $altoancho[ 1 ] );

		$copy = imagejpeg( $thumb, $image_path , 100 );

		if( $copy ) {
			$OBJ_RESPONSE->estado = "OK";
			$OBJ_RESPONSE->path = "/" . str_replace( "../", "", $image_path );
		} else {
			$OBJ_RESPONSE->estado = "KO";
			$OBJ_RESPONSE->alerta = "Hubo un error guardando la imagen";
		}

		break;

	//  - - - - - - - - - - - - - - - - - - - - 
	//  IMAGEN PNG
	//  - - - - - - - - - - - - - - - - - - - - 
	
	case 'image/png':
		$ext = "png";
		$image_path = image_path( $path, $ext );

		$resource = imagecreatefrompng( $file[ "tmp_name" ] );
		$thumb = imagecreatetruecolor( $ancho, $alto );

		imagealphablending( $thumb, false );
		imagesavealpha( $thumb, true );
		$colorFondo = imagecolorallocatealpha( $thumb, 255, 255, 255, 127 );

		imagefilledrectangle( $thumb, 0, 0, $ancho, $alto, $colorFondo ); 
		imagecopyresampled( $thumb, $resource, 0, 0, 0, 0, $ancho, $alto, $altoancho[ 0 ], $altoancho[ 1 ] );

		$copy = imagepng( $thumb, $image_path );

		if( $copy ) {
			$OBJ_RESPONSE->estado = "OK";
			$OBJ_RESPONSE->path = "/" . str_replace( "../", "", $image_path );
		} else {
			$OBJ_RESPONSE->estado = "KO";
			$OBJ_RESPONSE->alerta = "Hubo un error guardando la imagen";
		}

		break;
	
	//  - - - - - - - - - - - - - - - - - - - - 
	//  IMAGEN GIF
	//  - - - - - - - - - - - - - - - - - - - - 
	
	case 'image/gif':
		$ext = "gif";
		$image_path = image_path( $path, $ext );

		$copy = move_uploaded_file( $file[ "tmp_name" ], $image_path );

		if( $copy ) {
			$OBJ_RESPONSE->estado = "OK";
			$OBJ_RESPONSE->path = "/" . str_replace( "../", "", $image_path );
		} else {
			$OBJ_RESPONSE->estado = "KO";
			$OBJ_RESPONSE->alerta = "Hubo un error guardando la imagen";
		}

		break;
	
	//  - - - - - - - - - - - - - - - - - - - - 
	//  SI NO ES IMAGEN VÁLIDA
	//  - - - - - - - - - - - - - - - - - - - - 
	
	default:
		$OBJ_RESPONSE->estado = "KO";
		$OBJ_RESPONSE->alerta = "El archivo subido no es una imagen válida";
		
		break;
}

// -------------------------- //
// -------------------------- //
// ----->>> RESPONSE <<<----- //
// -------------------------- //
// -------------------------- //

echo json_encode( $OBJ_RESPONSE );

?>