/**
 * @file historico.js
 * @description Módulo encargado de la visualización gráfica e histórica del valor de la Unidad de Crédito (UC).
 * Utiliza la librería externa Chartist para renderizar una gráfica lineal mostrando la evolución del precio de la UC en divisas a lo largo del tiempo.
 * Contiene las configuraciones estéticas y responsivas de la gráfica para adaptarse a distintas resoluciones de pantalla.
 */
/**
 * Configuracion del grafico historico de UC.
 * Actualizar labels y series cuando se agreguen nuevos valores anuales o mensuales.
 */
const HISTORICO_UC_CONFIG = {
	/** Selector del contenedor Chartist donde se renderiza el historico. */
	CHART_SELECTOR: ".ct-chart",
	/** Padding derecho del grafico para evitar corte visual de etiquetas. */
	CHART_PADDING_RIGHT: 10
};

/** Opciones responsivas de Chartist. Actualmente quedan vacias y los bloques antiguos se conservan comentados al final conceptual del arreglo. */
let responsiveOptions = [
	/*  [
        "screen and (max-width: 640px)",
        {
            showPoint: false,
            offset: 30,
            axisY: {
                labelInterpolationFnc: function (value) {
                    return value / 1000000 + "MM";
                },
            },
            axisX: {
                labelInterpolationFnc: function (value) {
                    let arrLabel = value.split("-");
                    return arrLabel[1];
                },
            },
        },
    ],
    [
        "screen and (max-width: 340px)",
        {
            showPoint: false,
            offset: 15,
            axisY: {
                labelInterpolationFnc: function (value) {
                    return value / 1000000 + "MM";
                },
            },
            axisX: {
                labelInterpolationFnc: function (value) {
                    /*let arrLabel = value.split("-");
                    return arrLabel[1];
                    return value[0].toUpperCase();
                },
            },
        },
    ],*/
];

new Chartist.Line(
	HISTORICO_UC_CONFIG.CHART_SELECTOR,
	{
		labels: [
			"mar-20",
			"abr-20",
			"may-20",
			"jun-20",
			"jul-20",
			"ago-20",
			"sep-20",
			"oct-20",
			"nov-20",
			"dic-20",
			"ene-21",
			"feb-21",
			"mar-21",
			"abr-21",
			"jun-21",
			"ene-22",
			"abr-22",
			"jun-22",
			"ago-22",
			"nov-22",
			"jul-23",
			"jul-24",
            "jul-25",
            "jul-26",
		],
		series: [[5.47, 5.47, 7.11, 9.59, 4.65, 6.29, 7.41, 6.38, 8.62, 12.5, 8.15, 11, 12, 10, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, ]],
	},
	{
		chartPadding: {
			right: HISTORICO_UC_CONFIG.CHART_PADDING_RIGHT,
		},
		/*axisY: {
            offset: 50,
            labelInterpolationFnc: function (value) {
                return value / 1000 + "mil";
            },
        },*/
	},
	responsiveOptions
);
