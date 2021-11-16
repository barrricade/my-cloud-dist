import QueueAnim from 'rc-queue-anim';
import React from 'react';
import { getCookie } from 'Public'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Carousel, message, Tooltip } from 'antd';
import css from './login.scss'
import {getCaptcha,userLogin} from '../../api/user'
import { connect } from 'react-redux';
import { addUserinfo } from '../../actions'
const FormItem = Form.Item;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            captcha: "",
            loginForm:{
                Account:"",
                Password:"",
                Captcha:""
            }
        }
    }

    componentDidMount () {
        // console.log("sssss",this.props.Userinfo)
        getCookie('token') ? this.props.history.push("/") : null;
        this.getCode();
    }

    getCode = () => {
        this.setState({code:getCaptcha(Math.random())})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                userLogin(values).then(res=>{
                    if(res.data.code === 0) {
                        this.props.dispatch(addUserinfo(res.data.data))
                        this.props.history.push("/");
                        message.success("登录成功")
                    }
                    else {
                        message.error(res.data.data)
                        this.getCode()
                    }
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return <QueueAnim type="alpha">
            <div className={css.boxs} key={1}>
                <div className={css.login_logo}>
                    {/* <div>
                        <img src="https://i.bstu.cn/img/logo.png" alt=""/>
                    </div> */}
                    <div className={css.login_manu}>
                        <ul>
                            {/* <li className={css.txt_danger}>百度网盘严打违规文件和盗版侵权传播</li> */}
                            {/* <li>百度首页</li>
                            <li>客户端下载</li>
                            <li>官方贴吧</li>
                            <li>官方微博</li>
                            <li>问题反馈</li> */}
                            {/* <li className={css.vip}>会员中心</li> */}
                        </ul>
                    </div>
                </div>
                <div>
                    <Carousel autoplay effect="fade">
                        <div className={css.car_list}>
                            <img src="https://i.bstu.cn/img/bg1.jpg" alt="" />
                            <div className={css.car_item}>
                                <div>
                                    <div className={css.car_l}>
                                        <img src="https://i.bstu.cn/img/leftquote.png" alt="" />
                                    </div>
                                    <div className={css.car_c}>安全存储</div>
                                    <div className={css.car_r}>
                                        &nbsp;
                                    </div>
                                </div>
                                <div>
                                    <div className={css.car_l}>
                                        &nbsp;
                                    </div>
                                    <div className={css.car_c}>生活井井有条</div>
                                    <div className={css.car_r}>
                                        <img src="https://i.bstu.cn/img/rightquote.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={css.car_list}>
                            <img src="https://i.bstu.cn/img/bg2.jpg" alt="" />
                            <div className={css.car_item}>
                                <div>
                                    <div className={css.car_l}>
                                        <img src="https://i.bstu.cn/img/leftquote.png" alt="" />
                                    </div>
                                    <div className={css.car_c}>在线预览</div>
                                    <div className={css.car_r}>
                                        &nbsp;
                                    </div>
                                </div>
                                <div>
                                    <div className={css.car_l}>
                                        &nbsp;
                                    </div>
                                    <div className={css.car_c}>文件即开即看</div>
                                    <div className={css.car_r}>
                                        <img src="https://i.bstu.cn/img/rightquote.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={css.car_list}>
                            <img src="https://i.bstu.cn/img/bg3.jpg" alt="" />
                            <div className={css.car_item}>
                                <div>
                                    <div className={css.car_l}>
                                        <img src="https://i.bstu.cn/img/leftquote.png" alt="" />
                                    </div>
                                    <div className={css.car_c}>多端并用</div>
                                    <div className={css.car_r}>
                                        &nbsp;
                                    </div>
                                </div>
                                <div>
                                    <div className={css.car_l}>
                                        &nbsp;
                                    </div>
                                    <div className={css.car_c}>数据随身携带</div>
                                    <div className={css.car_r}>
                                        <img src="https://i.bstu.cn/img/rightquote.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={css.car_list}>
                            <img src="https://i.bstu.cn/img/bg4.jpg" alt="" />
                            <div className={css.car_item}>
                                <div>
                                    <div className={css.car_l}>
                                        <img src="https://i.bstu.cn/img/leftquote.png" alt="" />
                                    </div>
                                    <div className={css.car_c}>好友分享</div>
                                    <div className={css.car_r}>
                                        &nbsp;
                                    </div>
                                </div>
                                <div>
                                    <div className={css.car_l}>
                                        &nbsp;
                                    </div>
                                    <div className={css.car_c}>共度幸福时光</div>
                                    <div className={css.car_r}>
                                        <img src="https://i.bstu.cn/img/rightquote.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
                <div className={css.box}>
                    <h2 className={css.title}>账号密码登录</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('Account', {
                                rules: [{ required: true, message: '请输入用户名!' }]
                                // initialValue: 'admin'
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('Password', {
                                rules: [{ required: true, message: '请输入密码!' }]
                                // initialValue: '123456'
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password"
                                    placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <div className={css.code}>
                                {getFieldDecorator('Captcha', {
                                    rules: [{ required: true, message: '请输入验证码!' }],
                                })(
                                    <Input len={4} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="验证码" />
                                )}
                                <Tooltip placement="right" title="刷新">
                                    <img src={process.env.BASE_URL +  this.state.code} alt="img" onClick={()=>{this.getCode()}}></img>
                                </Tooltip>
                            </div>
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a href="/retrieve">忘记密码</a>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                            <p>还没有账号？ <Link to="/register">去注册</Link></p>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <div className={css.agreement}>
                Copyright © 2017-2018 cloud-disk
            </div>
        </QueueAnim>
    }
}

const Indexs = Form.create()(Index);
export default connect(Userinfo=>Userinfo)(Indexs)