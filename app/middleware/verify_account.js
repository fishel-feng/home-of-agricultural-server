'use strict';

module.exports = () => {
  return async function(next) {
    // const { accountCookieId } = this.app.config;
    // let accountToken = this.cookies.get(accountCookieId);

    // if (!accountToken) {
    //   if (this.headers.authorization && this.headers.authorization.includes(accountCookieId)) {
    //     [ , accountToken ] = this.headers.authorization.split(' ');
    //   }
    // }

    // this.accountToken = accountToken;
    // const { User } = this.app.model;

    // const user = await User.verifyAccountToken.call(this, accountToken);

    // this.user = user;
    await next;
  };
};
