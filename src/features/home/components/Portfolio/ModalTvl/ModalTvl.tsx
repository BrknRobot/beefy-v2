import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import React, { forwardRef, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../vault/components/Card';
import CloseIcon from '@material-ui/icons/Close';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { selectAllChains } from '../../../../data/selectors/chains';
import { ChainEntity } from '../../../../data/entities/chain';
import { selectTvlByChain } from '../../../../data/selectors/tvl';
import BigNumber from 'bignumber.js';
import { formatBigUsd } from '../../../../../helpers/format';
import { ContentLoading } from '../../../../../components/ContentLoading';
import { Button } from '../../../../../components/Button';
import { useAppSelector } from '../../../../../store';

const useStyles = makeStyles(styles);

export type ModalTvlProps = {
  close: () => void;
};

const _ModalTvl = forwardRef<HTMLDivElement, ModalTvlProps>(function ({ close }, ref) {
  const classes = useStyles();
  const { t } = useTranslation();
  const tvls = useAppSelector(selectTvlByChain);

  const chains = useAppSelector(selectAllChains);
  return (
    <div className={classes.holder} ref={ref} tabIndex={-1}>
      <Card>
        <CardHeader className={classes.header}>
          <CardTitle titleClassName={classes.title} title={t('TVL-bychain')} />
          <IconButton className={classes.removeHover} onClick={close} aria-label="settings">
            <CloseIcon htmlColor="#8A8EA8" />
          </IconButton>
        </CardHeader>
        <CardContent className={classes.container}>
          <Grid container spacing={2}>
            {chains.map(chain => {
              return (
                <Grid key={chain.id} item xs={6} lg={3}>
                  <Chain chain={chain} tvl={tvls[chain.id]} />
                </Grid>
              );
            })}
          </Grid>
          <Button onClick={close} variant="success" fullWidth={true} className={classes.btn}>
            {t('Close')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
});

export const ModalTvl = memo<ModalTvlProps>(_ModalTvl);

function Chain({ chain, tvl }: { chain: ChainEntity; tvl: BigNumber }) {
  const classes = useStyles();

  return (
    <Box className={classes.chain}>
      <img
        className={classes.chainLogo}
        alt={chain.id}
        src={require(`../../../../../images/networks/${chain.id}.svg`).default}
      />
      <Box>
        <div className={classes.chainText}>{chain.name}</div>
        <>
          {tvl ? <div className={classes.chainValue}>{formatBigUsd(tvl)}</div> : <ContentLoading />}
        </>
      </Box>
    </Box>
  );
}
