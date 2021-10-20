import React from 'react';
import { makeStyles, Grid, Container, withStyles, Switch, Typography, TextField, CardActions, Card } from '@material-ui/core/';
import { teal } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Wrapper from './styles';
import {Paper} from '@material-ui/core'

const TealSwitch = withStyles({
    switchBase: {
      color: teal[300],
      '&$checked': {
        color: teal[500],
      },
      '&$checked + $track': {
        backgroundColor: teal[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const category = [
    { title: '스포츠'},
    { title: '정치'},
    { title: '연예'},
    { title: '경제'},
    { title: '사회'},
    { title: '생활/문화'},
    { title: 'IT/과학'},
  ];

const MirrorSetting = () => {

    return(
            <Wrapper>
                <div className='menu daily-menu'><h3>스마트 미러 관리</h3></div>
                <hr style={{border:'#dbdbdb 1px solid'}}/>
                <Container>
                    <Card className='mirror-card'>
                        <CardActions>
                            <div className='left-title'>
                                <h3>코로나19</h3>
                            </div>
                            <div className='right-setting'>
                                <TealSwitch/>
                            </div>
                        </CardActions>
                    </Card>

                    <Card className='mirror-card'>
                        <CardActions>
                            <div className='left-title'>
                                <h3>나의 주식</h3>
                            </div>
                            <div className='right-setting'>
                                <TealSwitch/>
                            </div>
                        </CardActions>
                    </Card>
                    <Card className='mirror-card'>
                        <CardActions>
                            <div className='left-title'>
                                <h3>오늘의 뉴스</h3>
                            </div>
                            <div className='right-setting'>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                style={{color: 'teal'}}
                                options={category}
                                getOptionLabel={(option) => option.title}
                                // defaultValue={[category[0]]}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                
                                />
                                )}
                            />
                            </div>
                        </CardActions>
                    </Card>
                </Container>
        </Wrapper>
    );
}

export default MirrorSetting;