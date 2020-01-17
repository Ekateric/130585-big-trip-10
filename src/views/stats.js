import AbstractSmartComponent from "./abstract-smart";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import makeFirstCharUpperCase from "../utils/common/makeFirstCharUpperCase";
import getEmojiIcon from "../utils/common/getEmojiIcon";

const Colors = {
  BACKGROUND: `#f2f2f2`,
  TEXT: `#000000`,
  BAR: `#ffffff`
};

const BAR_THICKNESS = 32;
const BAR_PERCENTAGE = 0.8;
const CATEGORY_PERCENTAGE = 1;
const MIN_BAR_LENGTH = 55;
const MIN_CTX_HEIGHT = 150;
const LABELS_FONT_SIZE = 14;
const LABELS_ANCHOR = `end`;
const LABELS_ALIGN = `start`;
const LAYOUT_PADDING_LEFT = 40;
const TITLE_FONT_SIZE = 20;
const TITLE_POSITION = `left`;
const TICKS_FONT_SIZE = 14;
const TICKS_FONT_STYLE = `bold`;

const countCtxHeight = (barsCount) => {
  return Math.max(barsCount * BAR_THICKNESS / BAR_PERCENTAGE, MIN_CTX_HEIGHT);
};

const renderMoneyChart = (moneyCtx, moneyInfo) => {
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: moneyInfo.types,
      datasets: [{
        data: moneyInfo.moneySums,
        backgroundColor: Colors.BAR,
        barPercentage: BAR_PERCENTAGE,
        categoryPercentage: CATEGORY_PERCENTAGE,
        minBarLength: MIN_BAR_LENGTH,
        barThickness: BAR_THICKNESS
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          formatter(val) {
            return `€ ${val}`;
          },
          font: {
            size: LABELS_FONT_SIZE
          },
          color: Colors.TEXT,
          anchor: LABELS_ANCHOR,
          align: LABELS_ALIGN
        }
      },
      layout: {
        padding: {
          left: LAYOUT_PADDING_LEFT
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontSize: TITLE_FONT_SIZE,
        fontColor: Colors.TEXT,
        position: TITLE_POSITION
      },
      legend: {
        display: false
      },
      scales: {
        offset: false,
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontStyle: TICKS_FONT_STYLE,
            fontSize: TICKS_FONT_SIZE,
            fontColor: Colors.TEXT,
            callback(value) {
              return `${getEmojiIcon(value)} ${makeFirstCharUpperCase(value)}`;
            }
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            display: false
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
    }
  });
};


const createStatsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class StatsView extends AbstractSmartComponent {
  constructor(statsInfo) {
    super();

    this._info = statsInfo;
    this._element = this.getElement();
    this._moneyChart = null;

    this._renderCharts();
  }

  _renderCharts() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);

    moneyCtx.height = countCtxHeight(this._info.moneyInfo.types.length);
    this._moneyChart = renderMoneyChart(moneyCtx, this._info.moneyInfo);
  }

  getTemplate() {
    return createStatsTemplate();
  }
}
