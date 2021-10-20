import styled from 'styled-components';
const Wrapper = styled.div`
paper {
    position: 'absolute';
    width:400;
    backgroundColor: '#E5E3E3';
    border: '1px solid #66A091';
    boxShadow: theme.shadows[5];
    padding: '16px';
    borderRadius:'10px';
    maxWidth:'90%';
    maxHeight:'90%';
  }
  .container {
    flexWrap: 'wrap';
  }
  .day{
    textAlign: 'center';
    marginBottom:'10px';
  }
  .text{
    textAlign: "center";
    marginBottom: "10px";
  }
  .textField {
    marginLeft: theme.spacing(1);
    marginRight: theme.spacing(1);
    marginTop: theme.spacing(2);
    width: 230;
  }
  .switchField {
    marginLeft: theme.spacing(1);
    marginRight: theme.spacing(1);
    marginTop: theme.spacing(2);
    width: 60;
  }
  .inputDiv{
    backgroundColor:'white';
    padding:'10px';
    borderRadius:'20px';
    marginBottom:'10px';
    width:'100%';
    border:'#66A091 1px solid';
  }
  .buttonRight{
    width: '100%';
    border: 'none';
    padding: '5px';
    borderRadius: '20px';
    height:'40px';
    backgroundColor: '#89DDBF';
    color:'white';
    fontWeight:'bold';
  }
  .buttonDiv{
    marginTop:'10px';
  }
  .floatRight{
    float:'right';
    color: 'lightgray';
  }
  .switch{
    marginTop: '-7px';
  }
  .color {
    width: '36px';
    height: '14px';
    borderRadius: '2px';
    background: '#89DDBF';
  }
  .swatch {
    padding: '5px';
    background: '#fff';
    borderRadius: '1px';
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)';
    display: 'inline-block';
    cursor: 'pointer';
    
  }
  .popover {
    position: 'right';
    zIndex: '1',
  }
  .cover {
    position: 'fixed';
    top: '0px';
    right: '0px';
    bottom: '0px';
    left: '0px';
  }
  

`;
export default Wrapper;