import { PolymerElement, html, Polymer } 		from "../aw_polymer_3/polymer/polymer-element.js";
import { AwFormValidateMixin } 					from "../aw_form_mixins/aw-form-validate-mixin.js";
import { AwExternsFunctionsMixin } 				from "../aw_extern_functions/aw-extern-functions-mixin.js";

import "../aw_button/aw-button.js";
import "../aw_polymer_3/iron-icons/iron-icons.js";
import "../aw_polymer_3/iron-icons/editor-icons.js";
import "../aw_polymer_3/iron-icons/av-icons.js";

class AwWys extends AwFormValidateMixin ( AwExternsFunctionsMixin ( PolymerElement )) {
	static get template() {
		return html`
		<style>
            :host {
                position: relative;
                display: block;
                overflow: hidden;
                border: var(--aw-wys-border,solid 1px #DDDDDD);
				height: 400px;

                --aw-button-font-size: 12px;
                --aw-button-padding: 8px 7px 9px;
            }
            :host([unresolved]) {
                display: none;
            }

            /* #region Generales */

            #container {
                position: relative;
                height: 100%;
                display: flex;
                flex-flow: column;
            }

            #container textarea {
                display: none;
            }

            input[type="text"], input[type="number"] {
                color: #333333;
                width: 100%;
                padding: 6px 7px;
                margin-bottom: 7px;
                font-family: arial;
                font-size: 14px;
                border: solid 1px #DDDDDD;
                border-radius: 4px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
            }

            input[type=file] {
                color: #333333;
                width: 100%;
                padding: 3px 7px;
                margin-bottom: 7px;
                font-family: arial;
                font-size: 14px;
                border: solid 1px #DDDDDD;
                border-radius: 4px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
            }

            textarea {
                color: #333333;
                width: 100%;
                padding: 6px 7px;
                margin-bottom: 7px;
                font-family: arial;
                font-size: 14px;
                border: solid 1px #DDDDDD;
                border-radius: 4px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
                resize: none;
            }

            select {
                color: #333333;
                max-width: 100%;
                padding: 5px 7px;
                margin-bottom: 7px;
                font-family: arial;
                font-size: 14px;
                border: solid 1px #DDDDDD;
                border-radius: 4px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
            }

            aw-button {
                width: 100%;
            }

            input:focus, select:focus, textarea:focus {
                outline: 0;
            }

            .hidden {
                display: none;
            }

            /* #endregion */

            /* #region Opciones del editor */

            .awwys-cont_options {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
                display: flex;
                flex-flow: row wrap;
                padding: 3px;
                background-color: var(--aw-wys-options-bg-color,#F0F0F0);
                border-bottom: var(--aw-wys-options-border,solid 1px #DDDDDD);
            }

            .awwys-group {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
                display: flex;
                flex-flow: row wrap;
                border-radius: 2px;
                margin: 3px 3px;
                background-color: var(--aw-wys-group-bg-color,white);
                border: var(--aw-wys-group-border,solid 1px #DDDDDD);
                border-radius: var(--aw-wys-group-border-radius,2px);
            }

            .awwys-option {
                position: relative;
                flex-grow: 0;
                flex-basis: 0;
                padding: var(--aw-wys-option-padding,2px 3px 0 3px);
                background-color: var(--aw-wys-option-bg-color,transparent);
                cursor: pointer;
                transition: all .2s;
            }

            .awwys-option iron-icon{
                width: var(--aw-wys-icon-size,22px);
                height: var(--aw-wys-icon-size,22px);
                fill: var(--aw-wys-icon-color,#555555);
                transition: fill .2s;
            }

            .awwys-option.active {
                background-color: #DDDDDD;
                box-shadow: inset 0 0 5px #333333;
            }
            .awwys-option.active iron-icon {
                fill: var(--aw-wys-icon-color-active,#111111);
            }

            .awwys-option:hover {
                background-color: var(--aw-wys-option-bg-color-hv,#F0F0F0);
            }

            .awwys_barcolor {
                position: absolute;
                bottom: 5%;
                left: 8%;
                width: 84%;
                height: 15%;
                background-color: #333333;
            }

			div[data-opt=backColor] .awwys_barcolor {
				background-color: white;
			}

            /* #endregion */

            /* #region Contenedor editable */

            #textbox_editable {
                position: relative;
                flex-grow: 1;
                flex-basis: 0;
                align-self: stretch;
                background-color: #FFFFFF;
                outline: 0;
                padding: 8px;
                font-size: 16px;
                min-height: 250px;
                color: var(--aw-wys-color,#333333);
                font-family: var(--aw-wys-font-family,"arial");
                overflow: auto;
            }

            /* #endregion */
            
            /* #region Pestaá de tamaños de fuentes */

            .awys-font-sizes {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 140px;
                max-height: 200px;
                overflow: auto;
                background-color: white;
                box-shadow: 0 0 2px #333333;
                display: none;
                z-index: 3;
            }

            .awys-font-sizes > div {
                position: relative;
                padding: 7px;
                font-size: 12px;
                font-weight: normal;
                border-top: solid 1px #DDDDDD;
                transition: background .3s;
            }

            .awys-font-sizes > div:nth-child(1) {
                border-top: none;
            }

            .awys-font-sizes > div:hover {
                background-color: #DDDDDD;
            }

            .awys-font-sizes[open] {
                display: block;
            }
            
            /* #endregion */

            /* #region Paleta de colores */

            .awwys-paleta_colores {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 160px;
                background-color: white;
                box-shadow: 0 0 2px #333333;
                padding: 7px;
                display: none;
                z-index: 3;
            }

            .awwys-paleta_colores[open] {
                display: block;
            }
            
            .awwys-paleta_colores > div {
                position: relative;
                display: table;
                width: calc(100% - 2px);
                margin-top: 10px;
                border: solid 1px #CCCCCC;
            }

            .awwys-paleta_colores > div:nth-child(1) {
                margin: 0;
            }

            .awwys-paleta_colores > div > div {
                position: relative;
                display: table-row;
            }

            .awwys-paleta_colores > div > div > div {
                position: relative;
                display: table-cell;
                width: 20px;
                height: 20px;
                transition: opacity .3s;
            }

            .awwys-paleta_colores > div > div > div:hover {
                opacity: .8;
            }

            .awwys-paleta_colores input {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                border: none;
                padding: 0;
                margin: 0;
                vertical-align: middle;
                background: 0 0;
                cursor: pointer;
                outline: 0;
            }

            /* #endregion */

            /* #region Popup */

            .awwys_fondo {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                background-color: var(--aw-wys-fondo-color, rgba(10,10,10,.7));
                display: none;
            }

            .awwys_cont_popup {
                position: absolute;
                top: 0px;
                right: -300px;
                width: 300px;
                height: 100%;
                max-width: 100%;
                background-color: white;
                transition: right .3s;
            }

            .awwys_cont_popup[open] {
                right: 0;
            }

            .awwys_pp_tit {
                position: relative;
                padding: 10px 0;
                margin: 0 10px;
                font-size: 14px;
                text-transform: uppercase;
                border-bottom: dotted 1px #DDDDDD;
            }

            .awwys_pp_tit > p {
                padding: 0;
                margin: 0;
            }

            .awwys_pp_tit iron-icon {
                position: absolute;
                top: 7px;
                right: 0px;
                fill: #333333;
                cursor: pointer;
                transition: fill .3s;
            }

            .awwys_pp_tit iron-icon:hover {
                fill: #792D2D;
            }

            .awwys_pp_container {
                position: relative;
                padding: 10px;
                overflow: auto;
            }

            /* #endregion */

            /* #region Popup enlace, imagen */

            .awwys_add_link, .awwys_add_image, .awwys_add_video {
                position: relative;
                font-size: 12px;
            }

            .awwys_add_link .error, .awwys_add_image .error, .awwys_add_video .error {
                position: relative;
                text-align: center;
                padding: 5px 0;
                color: #803232;
                display: none;
            }

            .awwys_add_image input[name=file] {
                display: none;
            }

            /* #endregion */
            
            /* #region Ventana de opciones */
            
            .cont_win_opts {
                position: absolute;
                border: 1px solid;
                border-color: #CCCCCC;
                border-bottom: none;
                box-shadow: 0 0 3px #333333;
                background-color: #EAEAEA;
                border-radius: 2px;
                overflow: hidden;
                max-height: 170px;
                color: #333333;
                overflow: auto;
                display: none;
            }

            .cont_win_opts > div {
                position: relative;
                border-bottom: solid 1px #CCCCCC;
                padding-right: 10px;
                font-size: 12px;
                cursor: pointer;
            }

            .cont_win_opts > div:hover {
                background-color: #DDDDDD;
            }

            /* #endregion */
        
        </style>
        <div id="container">
            <!-- textarea oculto -->
            <textarea id$="[[id]]" name$="[[name]]" required$="[[required]]" novalidate$=[[novalidate]]>{{value}}</textarea>
            <!-- end textarea oculto -->
            
            <!-- opciones visibles -->
            <div class="awwys-cont_options"></div>
            <!-- end opciones visibles -->

            <!-- área editable -->
            <div id="textbox_editable" contenteditable="true" spellcheck="true" on-mouseup="_mouseup" on-keyup="_keyup" on-focusin="_focusin" on-focusout="_focusout"></div>
            <!-- end área editable -->
        </div>

        <!-- popup -->
        <div class="awwys_fondo" on-click="_close_popup"></div>
        <div class="awwys_cont_popup">
            <div class="awwys_pp_tit">
                <p>aquíi el título</p>
                <iron-icon icon="clear" title="Cerrar" on-click="_close_popup"></iron-icon>
            </div>
            <div class="awwys_pp_container">
                
            </div>
        </div>
        <!-- end popup -->

        <!-- Ventana de opciones -->
        <div class="cont_win_opts">

        </div>
        <!-- end ventana de opciones -->

        <!-- opciones ocultas -->
        <div class="hidden">
            <div class="awwys-option" title="Negrita" data-opt="bold" data-p1="bold" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-bold"></iron-icon>
            </div>
            <div class="awwys-option" title="Cursiva" data-opt="italic" data-p1="italic" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-italic"></iron-icon>
            </div>
            <div class="awwys-option" title="Subrayar" data-opt="underline" data-p1="underline" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-underlined"></iron-icon>
            </div>
            <div class="awwys-option" title="Tachado" data-opt="strikeThrough" data-p1="strikeThrough" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-strikethrough"></iron-icon>
            </div>
            <div class="awwys-option" title="Limpiar formato" data-opt="removeFormat" data-p1="removeFormat" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-clear"></iron-icon>
            </div>
            <div class="awwys-option active" title="Alinear a la izquierda" data-opt="justifyLeft" data-p1="justifyLeft" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-align-left"></iron-icon>
            </div>
            <div class="awwys-option" title="Alinear al centro" data-opt="justifyCenter" data-p1="justifyCenter" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-align-center"></iron-icon>
            </div>
            <div class="awwys-option" title="Alinear a la derecha" data-opt="justifyRight" data-p1="justifyRight" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-align-right"></iron-icon>
            </div>
            <div class="awwys-option" title="Justificar" data-opt="justifyFull" data-p1="justifyFull" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-align-justify"></iron-icon>
            </div>
            <div class="awwys-option" title="Añadir enlace" data-opt="addLink" data-state="off" on-mousedown="_open_link">
                <iron-icon icon="editor:insert-link"></iron-icon>
            </div>
            <div class="awwys-option" title="Insertar imagen" data-opt="addImage" data-state="off" on-click="_open_image">
                <iron-icon icon="editor:insert-photo"></iron-icon>
            </div>
            <div class="awwys-option" title="Insertar vídeo" data-opt="addVideo" data-state="off" on-click="_open_video">
                <iron-icon icon="av:movie"></iron-icon>
            </div>
            <div class="awwys-option" title="Insertar línea horizontal" data-opt="addLine" data-p1="insertHorizontalRule" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:drag-handle"></iron-icon>
            </div>
            <div class="awwys-option cont-pestanas" title="Insertar título" data-opt="heads" data-state="off" on-mouseenter="_open_pestana">
                <iron-icon icon="editor:title"></iron-icon>
                <div class="awys-font-sizes awwys-pestana" on-mouseleave="_close_pestanas">
                    <div on-mousedown="_apply_title" data-title="h1">Encabezado 1</div>
                    <div on-mousedown="_apply_title" data-title="h2">Encabezado 2</div>
                    <div on-mousedown="_apply_title" data-title="h3">Encabezado 3</div>
                    <div on-mousedown="_apply_title" data-title="h4">Encabezado 4</div>
                    <div on-mousedown="_apply_title" data-title="h5">Encabezado 5</div>
                    <div on-mousedown="_apply_title" data-title="h6">Encabezado 6</div>
                </div>
            </div>
            <div class="awwys-option" title="Cortar" data-opt="cut" data-state="off" data-p1="cut" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="content-cut"></iron-icon>
            </div>
            <div class="awwys-option" title="Copiar" data-opt="copy" data-state="off" data-p1="copy" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="content-copy"></iron-icon>
            </div>
            <div class="awwys-option" title="Pegar" data-opt="paste" data-state="off" data-p1="paste" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="content-paste"></iron-icon>
            </div>
            <div class="awwys-option" title="Deshacer" data-opt="undo" data-p1="undo" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="undo"></iron-icon>
            </div>
            <div class="awwys-option" title="Rehacer" data-opt="redo" data-p1="redo" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="redo"></iron-icon>
            </div>
            <div class="awwys-option" title="Lista desordenada" data-opt="insertUnorderedList" data-p1="insertUnorderedList" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-list-bulleted"></iron-icon>
            </div>
            <div class="awwys-option" title="Lista numérica" data-opt="insertOrderedList" data-p1="insertOrderedList" data-p2="true" data-p3="" on-mousedown="_apply">
                <iron-icon icon="editor:format-list-numbered"></iron-icon>
            </div>
            <div class="awwys-option" title="Cita" data-opt="formatBlock" data-p1="formatBlock" data-p2="true" data-p3="<blockquote>" on-mousedown="_apply">
                <iron-icon icon="editor:format-quote"></iron-icon>
            </div>
            <div class="awwys-option cont-pestanas" title="Fuente" data-opt="fontFamily" data-state="off" on-mouseenter="_open_pestana">
                <iron-icon icon="editor:format-shapes"></iron-icon>
                <div class="awys-font-sizes awwys-pestana" on-mouseleave="_close_pestanas">
                    <div on-mousedown="_apply_font_family" data-family="Arial">Arial</div>
                    <div on-mousedown="_apply_font_family" data-family="Calibri">Calibri</div>
                    <div on-mousedown="_apply_font_family" data-family="Comic Sans MS">Comic Sans MS</div>
                    <div on-mousedown="_apply_font_family" data-family="Courier">Courier</div>
                    <div on-mousedown="_apply_font_family" data-family="Georgia">Georgia</div>
                    <div on-mousedown="_apply_font_family" data-family="Helvetica">Helvetica</div>
                    <div on-mousedown="_apply_font_family" data-family="Times">Times new roman</div>
                    <div on-mousedown="_apply_font_family" data-family="Trebuchet">Trebuchet</div>
                    <div on-mousedown="_apply_font_family" data-family="Verdana">Verdana</div>
                </div>
            </div>
            <div class="awwys-option cont-pestanas" title="Tamaño fuente" data-opt="fontSize" data-state="off" on-mouseenter="_open_pestana">
                <iron-icon icon="editor:text-fields"></iron-icon>
                <div class="awys-font-sizes awwys-pestana" on-mouseleave="_close_pestanas">
                    <div on-mousedown="_apply_font_size" data-size="1">Muy pequeña</div>
                    <div on-mousedown="_apply_font_size" data-size="2">Pequeña</div>
                    <div on-mousedown="_apply_font_size" data-size="3">Normal</div>
                    <div on-mousedown="_apply_font_size" data-size="4">Grande</div>
                    <div on-mousedown="_apply_font_size" data-size="5">Muy grande</div>
                    <div on-mousedown="_apply_font_size" data-size="6">Gigante</div>
                </div>
            </div>
            <div class="awwys-option cont-pestanas" title="Color de la fuente" data-opt="fontColor" data-state="off" on-mouseenter="_open_pestana">
                <iron-icon icon="editor:format-color-text"></iron-icon>
                <div class="awwys_barcolor"></div>
                <div class="awwys-paleta_colores awwys-pestana" on-mouseleave="_close_pestanas">
                    <div>
                        <div>
                            <div style="background:#000000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#333333;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#666666;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#999999;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#CCCCCC;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#DDDDDD;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#F0F0F0;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#FFFFFF;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div style="background:red;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:orange;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:yellow;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:lime;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:aqua;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:blue;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:purple;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:magenta;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div style="background:#F4CCCC;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#FCE5CD;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#FFF2CC;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#D9EAD3;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#D0E0E3;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#CFE2F3;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#D9D2E9;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#EAD1DC;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#EA9999;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#F9CB9C;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#FFE599;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#B6D7A8;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#A2C4C9;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#9FC5E8;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#B4A7D6;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#D5A6BD;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#e06666;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#f6b26b;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#ffd966;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#93c47d;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#76a5af;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#6fa8dc;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#8e7cc3;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#c27ba0;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#cc0000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#e69138;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#f1c232;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#6aa84f;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#45818e;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#3d85c6;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#674ea7;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#a64d79;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#990000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#b45f06;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#bf9000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#38761d;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#134f5c;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#0b5394;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#351c75;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#741b47;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#660000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#783f04;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#7f6000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#274e13;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#0c343d;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#073763;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#20124d;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#4c1130;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="awwys-option cont-pestanas" title="Color de relleno" data-opt="backColor" data-state="off" on-mouseenter="_open_pestana">
                <iron-icon icon="editor:format-color-fill"></iron-icon>
                <div class="awwys_barcolor"></div>
                <div class="awwys-paleta_colores awwys-pestana" on-mouseleave="_close_pestanas">
                    <div>
                        <div>
                            <div style="background:#000000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#333333;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#666666;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#999999;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#CCCCCC;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#DDDDDD;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#F0F0F0;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#FFFFFF;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div style="background:red;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:orange;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:yellow;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:lime;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:aqua;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:blue;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:purple;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:magenta;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div style="background:#F4CCCC;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#FCE5CD;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#FFF2CC;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#D9EAD3;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#D0E0E3;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#CFE2F3;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#D9D2E9;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#EAD1DC;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#EA9999;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#F9CB9C;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#FFE599;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#B6D7A8;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#A2C4C9;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#9FC5E8;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#B4A7D6;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#D5A6BD;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#e06666;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#f6b26b;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#ffd966;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#93c47d;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#76a5af;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#6fa8dc;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#8e7cc3;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#c27ba0;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#cc0000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#e69138;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#f1c232;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#6aa84f;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#45818e;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#3d85c6;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#674ea7;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#a64d79;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#990000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#b45f06;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#bf9000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#38761d;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#134f5c;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#0b5394;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#351c75;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#741b47;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                        <div>
                            <div style="background:#660000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#783f04;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#7f6000;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#274e13;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#0c343d;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#073763;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#20124d;"><input type="button" on-mousedown="_apply_color"></div>
                            <div style="background:#4c1130;"><input type="button" on-mousedown="_apply_color"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="awwys-option" title="Ver código" data-opt="code" data-state="off" data-code="off" on-click="_viewCode">
                <iron-icon icon="code"></iron-icon>
            </div>
        </div>
        <!-- end opciones ocultas -->
		`;
	}

	static get properties() {
		return {
			// Elemento del input

			inputElement: { type: Object, value: null },
			input: { type: Boolean, value: false },
			focused: { type: Boolean, value: false },
			placeholder: { type: String, value: "" },
			codeview: { type: Boolean, value: false },

			// Propiedades del input

			id: { type: String, value:"" },
			name: { type: String, value: "" },
			value: { type: String, value: "" },

			// Listen functions

			funFocus: { type: String, value: "" },
			funApplyColor: { type: String, value: "" },

			// Opciones disponibles

			options: { type: String, value: "bold,italic,underline,strikeThrough,removeFormat|justifyLeft,justifyCenter,justifyRight,justifyFull|addLink,addImage,addVideo,addLine,heads|cut,copy,paste|undo,redo|insertUnorderedList,insertOrderedList,formatBlock|fontFamily,fontSize,fontColor,backColor|code" },

			// Atributos de validación

			required: { type: Boolean, value: false },
			novalidate: { type: Boolean, value: false },
			validateonchange: { type: Boolean, value: false },

			// Temporales
			
			functions: { type: Object, value: {}},
			link_prov: { type: String, value: "" },
		
			// Observer
			
			observerValue: { type: Object, value: null },

			// Relación con el aw-form y el form

			parentForm: Object,
			noregister: { type: Boolean, value: false }
		};
	}
	
	constructor() {
		super();

		/** @type {HTMLInputElement} */
		this.inputElement = undefined;
	}

	/**
	 * @method	connectedCallback
	 * 
	 * Realiza las operaciones necesarias al conectar el componente.
	 */
	connectedCallback() {
		super.connectedCallback();

		// Cogemos el textarea

		this.inputElement = this.shadowRoot.querySelector( "textarea" );

		// Asignamos el input de visibilidad
		
		this.input = this.inputElement;
		
		// Ejecutamos funciones de inicio

		this.init();

		// Buscamos si tiene pertenee a un formulario

		this._register_in_form();

		// Bindings del componente

		this._listeners();

		// Escuchamos el cambio en el valor

		this._listenValue();
		
		// Funciones de listeners

		this.functions = {
			add_link: this._add_link.bind( this ),
			add_image: this._add_image.bind( this ),
			change_img_type: this._change_img_type.bind( this ),
			add_video: this._add_video.bind( this ),
			change_vid_chbkox: this._change_vid_chbkox.bind( this )
		}
		
		// Resolvemos

		this.removeAttribute( "unresolved" );
	}

	/**
	 * @method	disconnectedCallback
	 * 
	 * Realiza las opereaciones necesarias al desconectar el componente.
	 */
	disconnectedCallback() {
		super.disconnectedCallback();

		this._removeListeners();
	}

	/**
	 * @method	getValue
	 * 
	 * Devuelve el valor del componente
	 */
	getValue() {
		return this.inputElement.value;
	}

	/**
	 * @method  init
	 *
	 * Inicia el componente
	 */
	init() {
		// Listen functions

		this._set_listen_funcs();

		// Asignamos el valor de inicio

		this._set_init_value();

		// Si es focused

		this._set_focus();        
		
		// Montamos las opciones

		this._load_options();
		
		// Posiciona las pestañas de colores
		
		this._set_pest_pos();
	}

	/**
	 * @method	_register_in_form
	 * 
	 * Registra el componente en el formulario.
	 */
	_register_in_form() {
		// Si no debe registrarse

		if( this.noregister ) {
			return false;
		}

		// Registramos el elemento

		this.dispatchEvent(new CustomEvent('aw-form-element-register', { detail: this, bubbles: true, composed: true }));
	}

	/**
	 * @method	_set_listen_funcs
	 * 
	 * Asignamos funciones de listeners
	 */
	_set_listen_funcs() {
		// Función que pone el focus en el textbox editable

		this.funFocus = function() {
			this.$.textbox_editable.focus();
		}.bind( this );

		// Función que aplica el color a la barra

		this.funApplyColor = function( ev ) {
			this._applyColor( ev );
		}.bind( this );
	}

	/**
	 * @method	_set_init_value
	 * 
	 * Asigna los valores de inicio.
	 */
	_set_init_value() {
		var value = this.innerHTML.match( /(\w)/ );
		
		if( this.placeholder && !value ) {
			this.placeholder = '<i style="color: #999999">' + this.placeholder + '</i>';
			this.$.textbox_editable.innerHTML = this.placeholder;
		} else if( value ) {
			this.$.textbox_editable.innerHTML = this.innerHTML;
			this.inputElement.value = this.innerHTML;
			this.value = this.innerHTML;
		}
	}

	/**
	 * @method  _set_focus
	 *
	 * Asignamos el focused
	 */
	_set_focus() {
		if( this.focused ) {
			if( this.$.textbox_editable.innerHTML === this.placeholder ) {
				this.$.textbox_editable.innerHTML = "";
			}

			this.$.textbox_editable.focus();
		}
	}

	/**
	 * @method  _load_options
	 *
	 * Cargamos las opciones del editor
	 */
	_load_options() {
		var contOpts = this.shadowRoot.querySelector( ".awwys-cont_options" );
		var groups = this.options.split( "|" );
		
		// Recorremos todos los grupos

		for( var i = 0; i < groups.length; i++ ) {
			var opts = groups[ i ].split( "," );
			
			// Creamos la división del grupo

			var divGrup = document.createElement( "DIV" );
			divGrup.classList.add( "awwys-group" );

			// Recorremos todas las opciones

			for( var o = 0; o < opts.length; o++ ) {
				// Cogemos la división

				var divOpt = this.shadowRoot.querySelector( ".awwys-option[data-opt=" + opts[ o ] + "]" );

				// Insertamos la opción en el grupo

				divGrup.appendChild( divOpt );
			}

			// Insertamos el grupo

			contOpts.appendChild( divGrup );
		} 
	}

	/**
	 * @method  _apply
	 *
	 * Aplicamos la opción a ejecutar
	 *
	 * @param   {event}                 ev              Evento del mouseDown
	 */
	_apply( ev ) {
		ev.preventDefault();

		var opt = ev.currentTarget;

		var state = opt.dataset.state;
		var p1 = opt.dataset.p1;
		var p2 = opt.dataset.p2;
		var p3 = opt.dataset.p3;

		p2 = ( p2 === "true" ) ? true : false;
		
		document.execCommand( p1, p2, p3 );

		if( p3 === "<blockquote>" ) {
			var blocks = this.$.textbox_editable.querySelectorAll( "blockquote" );

			for( var i = 0; i < blocks.length; i++ ) {
				blocks[ i ].style.padding = "10px";
				blocks[ i ].style.borderLeft = "solid 3px #CCCCCC";
				blocks[ i ].style.fontStyle = "oblique";
			}
		}

		this._actives();
		this._saveData();
	}
	
	/**
	 * @method _apply_color
	 *
	 * Aplica las opciones de color
	 */
	_apply_color( ev ) {
		if( !this._is_focus()) {
			this._focus();
		}

		var target = ev.currentTarget;
		var parent = target.parentElement;
		var container = target.parentElement.parentElement.parentElement.parentElement.parentElement;
		var bar = container.querySelector( ".awwys_barcolor" );

		var color = parent.style.background;

		if( container.dataset.opt == "fontColor" ) {
			document.execCommand('foreColor', false, color);
		} else if( container.dataset.opt = "backColor" ) {
			document.execCommand('backColor', false, color);
		}                

		bar.style.background = color;

		this._close_pestanas();
	}
	
	/**
	 * @method _apply_color
	 *
	 * Aplicamos tamaño de fuente
	 */
	_apply_font_size( ev ) {
		ev.preventDefault();

		if( !this._is_focus()) {
			this._focus();
		}

		var target = ev.currentTarget;
		var size = target.dataset.size;

		document.execCommand( 'fontSize', false, size );

		this._saveData();
		this._close_pestanas();
	}
	
	/**
	 * @method _apply_color
	 *
	 * Aplicamos fuentes
	 */
	_apply_font_family( ev ) {
		ev.preventDefault();

		if( !this._is_focus()) {
			this._focus();
		}

		var target = ev.currentTarget;
		var family = target.dataset.family;

		document.execCommand( 'fontName', false, family );

		this._saveData();
		this._close_pestanas();
	}
	
	/**
	 * @method _apply_title
	 *
	 * Aplicamos títulos
	 */
	_apply_title( ev ) {
		ev.preventDefault();

		if( !this._is_focus()) {
			this._focus();
		}

		var target = ev.currentTarget;
		var title = target.dataset.title;

		document.execCommand( 'formatBlock', false, title );

		this._saveData();
		this._close_pestanas();
	}

	/**
	 * @method  _add_link
	 *
	 * Añade un enlace al textarea
	 */
	_add_link( ev ) {
		var texto = this.shadowRoot.querySelector( ".awwys_add_link input[name=texto]" ).value;
		var enlace = this.shadowRoot.querySelector( ".awwys_add_link input[name=enlace]" ).value;
		var target = this.shadowRoot.querySelector( ".awwys_add_link select[name=target]" ).value;
		var error = this.shadowRoot.querySelector( ".awwys_add_link .error" );

		var contenido = this.$.textbox_editable.innerHTML;

		if( !this._validate_uri( enlace )) {
			error.innerHTML = "El enlace introducido no es correcto";
			error.style.display = "block";
			return false;
		}

		if( !texto ) {
			texto = enlace;
		}

		if( this.link_prov ) {
			contenido = contenido.replace( '<a href="' + this.link_prov + '">' + this.link_prov + "</a>", '<a href="' + enlace + '" target="' + target + '">' + texto + "</a>" );
			this.linkProv = "";
		} else {
			contenido = contenido.replace( '[insertProv_AWTE]', '<a href="' +enlace + '" target="' + target + '">' + texto + "</a>" );
		}

		this.$.textbox_editable.innerHTML = contenido;
		this._saveData();

		this._close_popup();
	}
	
	/**
	 * @method  _add_image
	 *
	 * Añade una imagen al textarea
	 */
	_add_image() {
		// Obtenemos el contenido y los inputs

		var content = this.$.textbox_editable.innerHTML;
		var input_url = this.shadowRoot.querySelector( ".awwys_pp_container input[name=url]" );
		var input_file = this.shadowRoot.querySelector( ".awwys_pp_container input[name=file]" );
		var imput_alt = this.shadowRoot.querySelector( ".awwys_pp_container input[name=alt]" );
		var error = this.shadowRoot.querySelector( ".awwys_pp_container .error" );
		error.style.display = "none";

		// Creamos el número aleatorio para el ID de la imagen

		var aleat = Math.floor(9999 * Math.random()) + 25;
		while( this.$.textbox_editable.querySelector( "#awwys_img_" + aleat )) {
			aleat = Math.floor(9999 * Math.random()) + 25;
		}

		var img = null;
		if( input_url.offsetHeight > 0 ) {
			// Cogemos la imagen

			img = input_url.value;

			// Si no hay valor

			if( !img ) {
				error.innerHTML = "Tienes que introducir la URL de una imagen";
				error.style.display = "block";
				return false;
			}
			
			// Si no es una URL válida

			if( !this._validate_uri( img )) {
				error.innerHTML = "La url introducida de la imagen no es correcta";
				error.style.display = "block";
				return false;
			}
			
			this.$.textbox_editable.innerHTML = content.replace( '[insertProv_AWTE]', '<div style="position:relative;text-align:center;"><img id="awwys_img_' + aleat + '" style="position:relative;margin:5px 0px 5px 0px;max-width:100%;cursor:default;" src="' + img + '"' + imput_alt.value + ' /></div>');
			
			this._close_popup();
			this._saveData();
		} else {
			// Cogemos la imagen

			img = input_file.files[ 0 ];

			// Mostramos cargando

			error.innerHTML = "Cargando imagen...";
			error.style.display = "block";

			// Enviamos datos por ajax
			// . . . . . . . . . . . . . . . . . . . . . 
			
			var xhr = new XMLHttpRequest();
			var data = new FormData();
			
			data.append( "img", img );
			
			// Escucha del completado
			
			xhr.addEventListener( "load", ( ev ) => {
				var EVAL = eval;
				var r = xhr.responseText;
				var o = EVAL( "(" + r + ")");
				console.log( "HOLA" );
			
				if( o.estado === "OK" ) {
					this.$.textbox_editable.innerHTML = content.replace( '[insertProv_AWTE]', '<div style="position:relative;text-align:center;"><img id="awwys_img_' + aleat + '" style="position:relative;margin:5px 0px 5px 0px;max-width:100%;cursor:default;" src="' + o.path + '"' + imput_alt.value + ' /></div>');
					
					this._close_popup();
					this._saveData();
				} else {
					error.innerHTML = o.alerta;
					error.style.display = "block";
				}
			}, false);
			
			// Enviío al script
			
			xhr.open( "POST", "/node_modules/aw_wys/scripts/upload-image.php" );
			xhr.send( data );
		}
	}
	
	/**
	 * @method  _add_image
	 *
	 * Añade un vídeo al textarea
	 */
	_add_video() {
		// Obtenemos el contenido y los inputs

		var content = this.$.textbox_editable.innerHTML;
		var code = this.shadowRoot.querySelector( ".awwys_pp_container textarea[name=code]" );
		var full = this.shadowRoot.querySelector( ".awwys_pp_container input[name=full_width]" );
		var ratio = this.shadowRoot.querySelector( ".awwys_pp_container select[name=ratio]" );
		var iput_ancho = this.shadowRoot.querySelector( ".awwys_pp_container input[name=ancho]" );
		var error = this.shadowRoot.querySelector( ".awwys_pp_container .error" );
		error.style.display = "none";

		// Comprobamos valires
		
		if( !code.value ) {
			error.innerHTML = "Tienes que introducir el código del vídeo";
			error.style.display = "block";
			return false;
		}

		if( !full.checked && ! iput_ancho.value ) {
			error.innerHTML = "Introduce el ancho del vídeo";
			error.style.display = "block";
			return false;
		}

		// Comprobamos el código
		
		var regIfr = /^(\s{0,}<iframe([A-Za-z0-9\:\;\s\#\%\-\.\,\(\)\+\=\"\/\?\_<\>\'\’&](?!\/iframe\>))+(\s){0,}(<\/iframe\>){1}$)/;
		var regObj = /^(\s{0,}<object([A-Za-z0-9\:\;\s\#\%\-\.\,\(\)\+\=\"\/\?\_<\>\'\’&](?!\/object\>))+(\s){0,}(<\/object\>){1}$)/;
		var regEmb = /^(\s{0,}<embed([A-Za-z0-9\:\;\s\#\%\-\.\,\(\)\+\=\"\/\?\_<\'\’&])+\>$)/;
		var regVid = /^(\s{0,}<video([A-Za-z0-9\:\;\s\#\%\-\.\,\(\)\+\=\"\/\?\_<\>\'\’&](?!<\/video\>))+(\s){0,}(<\/video\>){1}$)/;

		if ( !regIfr.test( code.value ) && !regObj.test( code.value ) && !regEmb.test( code.value ) && !regVid.test( code.value ) ) {
			error.innerHTML = "El código introucido no es correcto";
			error.style.display = "block";
			return false;
		}

		// Creamos el número aleatorio para el ID de la imagen

		var aleat = Math.floor(9999 * Math.random()) + 25;
		while( this.$.textbox_editable.querySelector( "#awwys_vid_" + aleat )) {
			aleat = Math.floor(9999 * Math.random()) + 25;
		}

		// Ajustamos el vídeo
		
		code.value = code.value.replace( /style\=\"([A-Za-z0-9\:\;\s\#\%\-\.\(\)\+])+\"/, '' );
		code.value = code.value.replace( /width\=\"\d{1,4}((%){0,1}|(px)?)\"/, '' );
		code.value = code.value.replace( /height\=\"\d{1,4}((%){0,1}|(px)?)\"/, '' );

		// Calculamos dimensiones
		
		var sr = ratio.value.split("-");
		var alto = ( parseInt( sr[ 1 ] ) / parseInt( sr[ 0 ] ) ) * 100 + '%';
		var ancho = null;

		if ( full.checked ) {
			ancho = "100%";
		} else {
			var anTextBox = this.$.textbox_editable.offsetWidth;
			var porAncho = ( iput_ancho.value * 100 ) / anTextBox;
			
			alto = parseInt( alto.replace( '%', '' ));
			alto = Math.round(( porAncho * alto ) / 100) + "%";
			ancho = iput_ancho.value + "px";
		}
		
		// Introducimos el video
		
		this.$.textbox_editable.innerHTML = content.replace( '[insertProv_AWTE]', '<div id="awwys_vid_' + aleat + '" style="position:relative;width:' + ancho + ';height:0;padding-bottom: ' + alto + ';margin:0 auto;overflow:hidden;" data-width="' + ancho + '" data-ratio="' + ratio.value + '">' + code.value + '</div>');

			// Aplicamos style al video

		var div_vid = this.shadowRoot.querySelector( "#awwys_vid_" + aleat + "" ).children[ 0 ];
		div_vid.style.position = "absolute";
		div_vid.style.top = "0";
		div_vid.style.left = "0";
		div_vid.style.width = "100%";
		div_vid.style.height = "100%";
		div_vid.style.maxWidth = "100%";

		// Cerramos el popup
					
		this._close_popup();
		this._saveData();
	}

	/**
	 * @method  _viewCode
	 *
	 * Muestra el código HTML del contenido
	 *
	 * @param   {event}                 ev              Evento del mouseDown
	 */
	_viewCode( ev ) {
		var el = ev.currentTarget;

		if( !this.inputElement.value ) {
			return false;
		}

		if( el.dataset.code === "off" ) {
			this.codeview = true;
			el.classList.add( "active" );
			el.dataset.code = "on";
			this.$.textbox_editable.textContent = this.inputElement.value;
		} else {
			this.codeview = false;
			el.classList.remove( "active" );
			el.dataset.code = "off";
			this.$.textbox_editable.innerHTML = this.$.textbox_editable.textContent;
		}
	}

	/**
	 * @method  _actives
	 *
	 * Aplica los botones activos según la posición del cursor
	 */
	_actives() {
		var shadowRoot = this.shadowRoot;
		var opts = [ 'bold', 'italic', 'underline', 'strikeThrough', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'insertOrderedList', 'insertUnorderedList', 'formatBlock', 'foreColor', 'backColor' ];

		for( var i = 0; i < opts.length; i++ ) {
			var opt = opts[ i ];

			if( opt !== "foreColor" && opt !== "backColor" ) {
				var button = shadowRoot.querySelector( ".awwys-option[data-opt=" + opt + "]" );
				
				if( document.queryCommandState( opt ) && !button.classList.contains( "active" )) {
					button.classList.add( "active" );
				} else if( !document.queryCommandState( opt ) && button.classList.contains( "active" )) {
					button.classList.remove( "active" );
				}
			} else {
				let color = document.queryCommandValue( opt );
				
				if( opt == "foreColor" ) {
					shadowRoot.querySelector( "div[data-opt=fontColor] .awwys_barcolor" ).style.backgroundColor = color;
				} else {
					shadowRoot.querySelector( "div[data-opt=backColor] .awwys_barcolor" ).style.backgroundColor = color;
				}
			}
			
		}
	}

	/**
	 * @method  _saveData
	 *
	 * Guarda los datos del editable al textarea
	 */
	_saveData() {
		if( this.codeview ) {
			var content = this.$.textbox_editable.textContent;
		} else {
			var content = this.$.textbox_editable.innerHTML;
		}

		if( content === "<br>" ) {
			content = "";
			this.$.textbox_editable.innerHTML = "";
		}

		this.inputElement.value = content;
		this.value = content;
		
		// Invocamos la función externa de change change

		if ( typeof this.changefunc === "function" ) {
			this.changefunc( this.inputElement );
		}
	}

	/**
	 * @method  _set_pest_pos
	 *
	 * Asigna la posición de las pestañas
	 */
	_set_pest_pos() {
		var pestanas = this.shadowRoot.querySelectorAll( ".awwys-pestana" );
		
		this._reset_pos_pestanas();
		for( var i = 0; i < pestanas.length; i++ ) {
			var parent = pestanas[ i ].parentElement;
			var top = parent.offsetHeight + 1;
			var left = ( parent.offsetWidth / 2 ) - ( 174 / 2 );
			
			pestanas[ i ].dataset.opt = parent.dataset.opt;
			pestanas[ i ].style.left = left + "px";
			pestanas[ i ].style.top = top + "px";
		}
	}
	
	/**
	 * @method  _reset_pos_pestanas
	 *
	 * Resetea la posición de las pestañas de opciones
	 */
	_reset_pos_pestanas() {
		var pestanas = this.shadowRoot.querySelectorAll( ".awwys-pestana" );

		for( var i = 0; i < pestanas.length; i++ ) {
			if( pestanas[ i ].offsetHeight > 0 ) {
				pestanas[ i ].removeAttribute( "style" );
			}
		}
	}

	/**
	 * @method  _open_pestana
	 *
	 * Abre pestañas de opciones
	 *
	 * @param   {HTMLObject}        pestana         Pestaña que se tiene que abrir
	 */
	_open_pestana( ev ) {
		var pestana = ev.currentTarget.querySelector( ".awwys-pestana" );
		this._close_pestanas();
		pestana.setAttribute( "open", "" );
	}
	
	/**
	 * @method  _close_pestanas
	 *
	 * Cierra las pestañas de opciones
	 */
	_close_pestanas() {
		var pestanas = this.shadowRoot.querySelectorAll( ".awwys-pestana" );
		for( var i = 0; i < pestanas.length; i++ ) {
			if( pestanas[ i ].hasAttribute( "open" )) {
				pestanas[ i ].removeAttribute( "open" );
			}
		}
	}

	/**
	 * @method  _open_popup
	 *
	 * Abre el popup
	 */
	_open_popup() {
		var fondo = this.shadowRoot.querySelector( ".awwys_fondo" );
		var popup = this.shadowRoot.querySelector( ".awwys_cont_popup" );
		var tit = this.shadowRoot.querySelector( ".awwys_pp_tit" );
		var container = this.shadowRoot.querySelector( ".awwys_pp_container" );

		var h = popup.offsetHeight - tit.offsetHeight - 20;
		container.style.height = h + "px";

		Polymer.Fade.in( fondo );
		popup.setAttribute( "open", "" );
	}
	
	/**
	 * @method  _close_popup
	 *
	 * Cierra el popup
	 */
	_close_popup() {
		var fondo = this.shadowRoot.querySelector( ".awwys_fondo" );
		var popup = this.shadowRoot.querySelector( ".awwys_cont_popup" );

		Polymer.Fade.out( fondo );
		popup.removeAttribute( "open" );

		// Quitamos texto provisional

		var content = this.$.textbox_editable.innerHTML;
		this.$.textbox_editable.innerHTML = content.replace( "[insertProv_AWTE]", "" )

		// Removemos listeners del popup

		var button = this.shadowRoot.querySelector( ".awwys_pp_container aw-button" );
		var func = button.dataset.func;

		if( func == "_add_link" ) {
			button.removeEventListener( "click", this.functions.add_link );
		} else if( func == "_add_image" ) {
			var select = this.shadowRoot.querySelector( ".awwys_pp_container select" );
			select.removeEventListener( "change", this.functions.change_img_type );
			button.removeEventListener( "click", this.functions.add_image );
		} else if( func == "_add_video" ) {
			var checkbox = this.shadowRoot.querySelector( ".awwys_pp_container input[type=checkbox]" );
			checkbox.removeEventListener( "change", this.functions.change_vid_chbkox );
			button.removeEventListener( "click", this.functions.add_video );
		}
	}
	
	/**
	 * @method  _open_link
	 *
	 * Abre el popup del enlace
	 */
	_open_link( ev, edit = false ) {
		ev.preventDefault();

		// Comprobamos si tiene el foco

		if( !this._is_focus() ) {
			this._focus();
		}

		// Ajustamos la selección del enlace

		var selection = '' + this.shadowRoot.getSelection();
		var uri = "http://";
		if( selection && edit !== true ) {
			if( this._validate_uri( selection )) {
				uri = selection;
			}

			this.link_prov = selection;
			document.execCommand( "createLink", "false", selection );
		} else if( edit === true ) {
			// TODO: Hacer el código para editar
		} else {
			setTimeout(() => {
				document.execCommand( "insertText", "false", '[insertProv_AWTE]' );
			}, 300 );
		}
		
		// Insertamos el popup

		var tit = this.shadowRoot.querySelector( ".awwys_pp_tit p" );
		var container = this.shadowRoot.querySelector( ".awwys_pp_container" );
		var div = `
		<div class="awwys_add_link">
			<input type="text" name="texto" placeholder="Texto del enlace" value="${ selection }">
			<input type="text" name="enlace" placeholder="URL del enlace" value="${ uri }">
			Destino<br>
			<select name="target">
				<option value="_self">Misma pestaña</option>
				<option value="_blank">Nueva pestaña</option>
			</select>
			<div class="error"></div>
			<aw-button data-func="_add_link">AÑADIR ENLACE</aw-button>
		</div>
		`;

		tit.innerHTML = "Añadir enlace";
		container.innerHTML = div;

		// Abrimos el popup
		
		this._open_popup();

		// Ponemos el botóna a la escucha

		var button = container.querySelector( "aw-button" );
		button.addEventListener( "click", this.functions.add_link );
	}
	
	/**
	 * @method  _open_image
	 *
	 * Abre el popup del imagen
	 */
	_open_image( ev, edit = false ) {
		// Comprobamos si tiene el foco

		if( !this._is_focus() ) {
			this._focus();
		}

		setTimeout(() => {
			document.execCommand( "insertText", "false", '[insertProv_AWTE]' );
		}, 300 );

		// Insertamos el popup

		var tit = this.shadowRoot.querySelector( ".awwys_pp_tit p" );
		var container = this.shadowRoot.querySelector( ".awwys_pp_container" );
		var div = `
		<div class="awwys_add_image">
			Origen<br>
			<select name="origen">
				<option value="url">Desde una URL</option>
				<option value="file">Desde el PC</option>
			</select>
			<input type="text" name="url" placeholder="URL de la imagen" value="">
			<input type="file" name="file" placeholder="Buscar imagen" value="">
			<input type="text" name="alt" placeholder="Título de la imagen" value="">
			<div class="error"></div>
			<aw-button data-func="_add_image">AÑADIR IMAGEN</aw-button>
		</div>
		`;

		tit.innerHTML = "Añadir imagen";
		container.innerHTML = div;

		// Select

		var select = container.querySelector( "select" );
		var button = container.querySelector( "aw-button" );
		select.addEventListener( "change", this.functions.change_img_type );
		button.addEventListener( "click", this.functions.add_image );

		// Abrimos el popup

		this._open_popup();
	}

	/**
	 * @method  _change_img_type
	 *
	 * Cambia el tipo de imagen a añadir
	 */
	_change_img_type( ev ) {
		var select = this.shadowRoot.querySelector( ".awwys_pp_container select" );
		var url = this.shadowRoot.querySelector( ".awwys_pp_container input[name=url]" );
		var file = this.shadowRoot.querySelector( ".awwys_pp_container input[name=file]" );
		if( select.value == "url" ) {
			url.style.display = "block";
			file.style.display = "none";
		} else {
			url.style.display = "none";
			file.style.display = "block";
		}
	}
	
	/**
	 * @method  _open_video
	 *
	 * Abre el popup del vídeo
	 */
	_open_video( ev, edit = false ) {
		// Comprobamos si tiene el foco

		if( !this._is_focus() ) {
			this._focus();
		}

		setTimeout(() => {
			document.execCommand( "insertText", "false", '[insertProv_AWTE]' );
		}, 300 );

		// Insertamos el popup

		var tit = this.shadowRoot.querySelector( ".awwys_pp_tit p" );
		var container = this.shadowRoot.querySelector( ".awwys_pp_container" );
		var div = `
		<div class="awwys_add_video">
			<textarea name="code" style="width: 100%; height: 110px" placeholder="Embebe el código del vídeo, Ej.:\n\n<iframe width=&#34;560&#34; height=&#34;315&#34; src=&#34;https://www.youtube.com/embed/pXbEcGUtHgo&#34; frameborder=&#34;0&#34; allowfullscreen></iframe>"></textarea>
			<div style="margin-bottom: 10px">
				<label><input type="checkbox" name="full_width" checked /> El vídeo ocupa todo el ancho</label>
			</div>
			<label class="iput_ancho hidden">Ancho: <input type="number" name="ancho" style="width:70px;" /> px <br /></label>
			Ratio: <select name="ratio"style="width:200px;">
				<option value="1-1">1:1 (Cuadrado)</option>
				<option value="3-2">3:2 (Película clásica)</option>
				<option value="4-3">4:3 (TV clásica)</option>
				<option value="16-9" selected>16:9 (Panorámico)</option>
				<option value="21-9">21:9 (Pantalla de cine)</option>
			</select>
			<div class="error"></div>
			<aw-button data-func="_add_video">AÑADIR VÍDEO</aw-button>
		</div>
		`;

		tit.innerHTML = "Añadir vídeo";
		container.innerHTML = div;

		// Ponemos a la escucha el botón

		var checkbox = container.querySelector( "input[type=checkbox]" );
		var button = container.querySelector( "aw-button" );
		checkbox.addEventListener( "change", this.functions.change_vid_chbkox );
		button.addEventListener( "click", this.functions.add_video );

		// Abrimos el popup

		this._open_popup();
	}

	/**
	 * @method	_change_vid_chbkox
	 * 
	 * Cambia el ancho del vídeo
	 */
	_change_vid_chbkox() {
		var ancho = this.shadowRoot.querySelector( ".awwys_add_video .iput_ancho" );

		if( ancho.classList.contains( "hidden" )) {
			ancho.classList.remove( "hidden" );
		} else {
			ancho.classList.add( "hidden" );
		}
	}

	/**
	 * @method  _is_focus
	 *
	 * Comprobamos si tienen el focus
	 */
	_is_focus() {
		if( !this.shadowRoot.activeElement ) {
			return false;
		} else if( this.shadowRoot.activeElement.id != "textbox_editable" ) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * @method  _focus
	 *
	 * Ponemos el focus en el textarea
	 */
	_focus( end = true ) {
		var txtarea = this.$.textbox_editable;
		txtarea.focus();

		if( end ) {
			if ( typeof window.getSelection != "undefined" && typeof document.createRange != "undefined" ) {
				var range = document.createRange();
				range.selectNodeContents( txtarea );
				range.collapse( false );
				
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange( range );
			} else {
				var textRange = document.body.createTextRange();
				textRange.moveToElementText( txtarea );
				textRange.collapse( false );
				textRange.select();
			}
		}
	}

	/**
	 * @method	_keyup
	 * 
	 * Evento al levantar la tecla del editor.
	 */
	_keyup( ev ) {		
		this._saveData();

		if( this.codeview ) {
			return false;
		}

		this._actives();
		this._close_pestanas();
	}

	/**
	 * @method	_mouseup
	 * 
	 * Evento al terminar el click en el editor
	 */
	_mouseup( ev ) {
		this._saveData();

		if( this.codeview ) {
			return false;
		}

		this._actives();
		this._close_pestanas();
	}
	
	/**
	 * @method  _focusin
	 *
	 * Evento al poner el focus
	 */
	_focusin() {
		if( this.$.textbox_editable.innerHTML === this.placeholder ) {
			this.$.textbox_editable.innerHTML = "";
		}

		// Invocamos la función externa keyup

		if ( typeof this.focusinfunc === "function" ) {
			this.focusinfunc( this.inputElement );
		}
	}

	/**
	 * @method  _focusout
	 *
	 * Eventp al quitar el focus
	 */
	_focusout() {
		if( this.$.textbox_editable.innerHTML === "" ) {
			this.$.textbox_editable.innerHTML = this.placeholder;
		}

		// Invocamos la función externa keyup

		if ( typeof this.focusoutfunc === "function" ) {
			this.focusoutfunc( this.inputElement );
		}
	}

	/**
	 * @method  _validate_uri
	 *
	 * Valida una URL
	 *
	 * @return  {boolean}                       TRUE si es una URL válida
	 */
	_validate_uri( url ) {
		return -1 != url.indexOf("http://", 0) && -1 != url.indexOf(".", 0) || -1 != url.indexOf( "javascript:;", 0 ) || -1 != url.indexOf("https://", 0) && -1 != url.indexOf(".", 0) || -1 != url.indexOf("ftp://", 0) && -1 != url.indexOf(".", 0) ? !0 : !1;
	}
	
	/**
	 * @method  _disable_contextmenu
	 *
	 * Desabilita el menú contextual del editor
	 */
	_disable_contextmenu( ev ) {
		//ev.preventDefault();
	}

	/**
	 * @method  _listeners
	 *
	 * Ponemos a la escuha los eventos
	 */
	_listeners() {
		this.$.textbox_editable.addEventListener( "contextmenu", this._disable_contextmenu );
	}

	/**
	* @method	_listenValue
	* 
	* Escucha los cambios en el valor del textarea
	*/
	_listenValue() {
		if( document.body.contains( this )) {
			if( this.inputElement.value !== this.value ) {
				this.value = this.inputElement.value;
				this.$.textbox_editable.innerHTML = this.value;
			}
			
			setTimeout(() => {
				this._listenValue();
			}, 500);
		}
	}

	/**
	 * @method  _removeListeners
	 *
	 * Elimna los listeners del componente
	 */
	_removeListeners() {
		this.$.textbox_editable.removeEventListener( "contextmenu", this._disable_contextmenu );
	}
}

window.customElements.define( "aw-wys", AwWys );