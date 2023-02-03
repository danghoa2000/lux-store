import { useFormik } from 'formik';
import React, { useState } from 'react';
import '../../../sass/app.scss';
import './login.scss';
import { EMAIL_PATTERN, MAX_EMAIL_CHARACTERS, MIN_EMAIL_CHARACTERS, MIN_PASSWORD_CHARACTERS } from '../../../../constants/constants';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Login = (props) => {
    const { isLoginFailed, handeSubmit, loading } = props;

    const form = useForm({
        criteriaMode: 'all',
        defaultValues: {
            remember: false,
        }
    });

    const onSubmit = (data) => {
        handeSubmit(data);
    };

    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 order-md-2">
                        <img src="https://preview.colorlib.com/theme/bootstrap/login-form-08/images/undraw_file_sync_ot38.svg" alt="Image" className="img-fluid" />
                    </div>
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="mb-4">
                                    <h3>{"Sign In to"} <strong>{"ELITE"}</strong></h3>
                                    <p className="mb-4">{"Wellcome To Our System"}</p>
                                </div>
                                {isLoginFailed && <span className='text-base text-danger'>{isLoginFailed.message}</span>}
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="form-group first">
                                        <label htmlFor="email">{"email"}</label>
                                        <input type="text" className="form-control" id="email"
                                            {...form.register("email", { required: { value: true, message: "this field is required" }, maxLength: MAX_EMAIL_CHARACTERS, minLength: MIN_EMAIL_CHARACTERS })}
                                        />
                                        <ErrorMessage errors={form.formState.errors} name="email" render={({ message }) => <p className='text-danger'>{message}</p>} />
                                    </div>
                                    <div className="form-group last mb-4">
                                        <label htmlFor="password">{"Password"}</label>
                                        <input type="password" className="form-control" id="password"
                                            {...form.register("password", { required: { value: true, message: "this field is required" }, maxLength: MAX_EMAIL_CHARACTERS })}
                                        />

                                        <ErrorMessage errors={form.formState.errors} name="password" render={({ message }) => <p className='text-danger'>{message}</p>} />
                                    </div>
                                    <div className="d-flex mb-5 align-items-center justify-content-between">
                                        <label className="control control--checkbox mb-0">
                                            <span className="caption">{"Remember me"}</span>
                                            <input type="checkbox"
                                                {...form.register("remember")}
                                            />
                                            <div className="control__indicator"></div>
                                        </label>
                                        <span className="ml-auto"><a href="#" className="forgot-pass">{"Forgot Password"}</a></span>
                                    </div>
                                    <input type="submit" value="Log In" disabled={loading} className="btn text-white btn-block btn-primary"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;