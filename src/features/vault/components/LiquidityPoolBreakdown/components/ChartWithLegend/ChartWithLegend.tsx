import { makeStyles } from '@material-ui/core';
import { styles } from './styles';
import { memo } from 'react';
import { CalculatedBreakdownData } from '../../types';
import { Legend } from '../Legend';
import { Chart } from '../Chart';

const useStyles = makeStyles(styles);

export type ChartWithLegendProps = {
  breakdown: CalculatedBreakdownData;
};
export const ChartWithLegend = memo<ChartWithLegendProps>(function ChartWithLegend({ breakdown }) {
  const classes = useStyles();

  return (
    <div className={classes.holder}>
      <Chart assets={breakdown.asset.underlying} />
      <Legend
        assets={breakdown.asset.underlying}
        chainId={breakdown.vault.chainId}
        className={classes.legend}
      />
    </div>
  );
});
