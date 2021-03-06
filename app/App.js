const React = require('react')
const DB = require('./DB')

class App extends React.Component {

    constructor(){
        super()
        this.state = {
            link:'./output/baidu.png',
            errorMsg:'',
        }
    }

    _submit(){
        this.setState({
            errorMsg:'loading...',
        })
        DB.Create.link({
            link:this.link.value,
        }).then(data=>{
            this.setState({
                link:data.url,
                errorMsg:'',
            })
        },({errorMsg})=>{
            this.setState({
                errorMsg,
            })
        })
    }

    render(){
        const {link,errorMsg} = this.state
        return [
            <h3 key='title'>链接地址转图片</h3>,
            <div key='link' className='in'>
                <span>链接地址:</span>
                <input placeholder='https://baidu.com'
                    ref={link=>this.link=link}
                    type="text"/>
                <a href="javascript:;" onClick={this._submit.bind(this)}>确定</a>
            </div>,
            <div key='preview' className='preview'>
                <img src={link} alt=""/>
            </div>,
            <p key='p'>
                服务器不存储数据,不定时清空,建议
                <a href={link} download="saveimage">下载</a>
            </p>,
            <div key='dialog' id="dialog" style={{display:(errorMsg?'':'none')}}>
                <a href="javascript:;"></a>
                <div>
                    {errorMsg}
                    <span onClick={()=>{
                        this.setState({
                            errorMsg:'',
                        })
                    }}>确定</span>
                </div>
            </div>
        ]
    }
}
module.exports = App
