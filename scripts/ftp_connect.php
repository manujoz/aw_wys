<?php

/**
 * INSTRUCCIÓNES DE CONFIGURACIÓN PARA SUBIR IMÁGENES DESDE EL PC
 * 
 * Configura los datos de conexión FTP correctamente. Asegúrate que las carpetas donde vayas
 * a guardar las imágnes existen en el servidor y tienen todos los permisos de escritura concedidos.
 * 
 * Por defecto se crea la siguiente ruta **img/awwys/galery/** para guardar las imágenes, puedes
 * configurar la ruta en la que quieres que se guarden modificando las líneas correspondientes
 * en la sección de "CREAMOS LA RUTA" de este script.
 * 
 * Para configurar la conexión FTP, cambia a tu necesidad los parámetros de las siguientes líneas
 * de código:
 * 
 * $c_ftp = ftp_connect( $_SERVER['SERVER_NAME'] );
 * 
 * if( $c_ftp ) {
 * 		$u_ftp= ftp_login( $c_ftp, "usuario_ftp", "pass_ftp" );
 * 		ftp_pasv( $c_ftp, true );
 * }
 */

//  - - - - - - - - - - - - - - - - - - - - 
//  OBTENEMOS EL DOMINIO
//  - - - - - - - - - - - - - - - - - - - - 

$protocol = ( isset( $_SERVER[ "HTTPS" ] )) ? "https://" : "http://";
$dominio = $protocol . "" . $_SERVER['SERVER_NAME'];

//  - - - - - - - - - - - - - - - - - - - - 
//  CREAMOS LA RUTA
//  - - - - - - - - - - - - - - - - - - - - 

$path = "";
while( !file_exists( $path . "node_modules/aw_wys" )) {
	$path .= "../";
}

if( !file_exists( $path . "img" )) {
	mkdir( $path . "img", 0777 );
}

if( !file_exists( $path . "img/awwys" )) {
	mkdir( $path . "img/awwys", 0777 );
}

if( !file_exists( $path . "img/awwys/galery" )) {
	mkdir( $path . "img/awwys/galery", 0777 );
}

$path .= "img/awwys/galery/";

//  - - - - - - - - - - - - - - - - - - - - 
//  CREAMOS LA CONEXIÓN
//  - - - - - - - - - - - - - - - - - - - - 

if ( $_SERVER['REMOTE_ADDR'] == "127.0.0.1" ) {
	$c_ftp = ftp_connect( "127.0.0.1" );
	
	if( $c_ftp ) {
		$u_ftp= ftp_login( $c_ftp, "web_arisman", "" );
		ftp_pasv( $c_ftp, true );
	}
} else {
    $c_ftp = ftp_connect( $_SERVER['SERVER_NAME'] );
    
	if( $c_ftp ) {
		$u_ftp= ftp_login( $c_ftp, "usuario_ftp", "pass_ftp" );
		ftp_pasv( $c_ftp, true );
	}
}


?>