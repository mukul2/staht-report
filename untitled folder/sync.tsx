/**
 * Sample for Area series with empty points
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Tooltip,
    DateTime, MultiColoredLineSeries, ILoadedEventArgs, ChartTheme,
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
var rainFallData = [];
rainFallData.push();

export let dataValues: Object[] = [];
let colors: string[] = ['red', 'green', '#ff0097', 'crimson', 'blue', 'darkorange', 'deepskyblue',
    'mediumvioletred', 'violet', 'peru', 'gray', 'deeppink', 'navy'];

for(var i = 0 ; i < 100 ; i ++){
    dataValues.push({
        XValue: new Date(2017, i, 1), YValue: Date.now(),
        color: colors[Math.floor(i / 16)]
    });
}
// rainFallData.map((value: number, index: number) => {
//     dataValues.push({
//         XValue: new Date(2017, -index, 1), YValue: value.toFixed(2),
//         color: colors[Math.floor(index / 16)]
//     });
// });

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Area empty sample
 */
export class LineMultiLine {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                                    primaryXAxis={{
                                        valueType: 'DateTime',
                                        labelFormat: 'y',
                                        intervalType: 'Years',
                                        edgeLabelPlacement: 'Shift',
                                        majorGridLines: { width: 0 }
                                    }}
                                    primaryYAxis={{
                                        rangePadding: 'None',
                                        minimum: 4,
                                        maximum: 10,
                                        title: 'Particulate Matter(PM)',
                                        lineStyle: { width: 0 },
                                        majorTickLines: { width: 0 },
                                        minorTickLines: { width: 0 }
                                    }}
                                    tooltip={{ enable: true, shared: true,enableAnimation : false}}
                                    legendSettings={{ visible: false }}
                                    chartArea={{ border: { width: 0 } }}
                                    load={this.load.bind(this)}
                                    width={Browser.isDevice ? '100%' : '60%'}
                                    title="Particulate Levels in Rainfall" loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[MultiColoredLineSeries, DateTime, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={dataValues} width={1.5} xName='XValue' yName='YValue' name='Rainfall'
                                             type='MultiColoredLine' pointColorMapping='color'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark") as ChartTheme;
    };

}