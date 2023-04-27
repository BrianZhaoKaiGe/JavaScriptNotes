# 公共方法

```javascript
// 四色五入，保留小数点后四位
let getFloat =  (number, n)=> {
		n = n ? parseInt(n) : 0;
		if (n <= 0) return Math.round(number);
		number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
		return number;
	};
//用法  getFloat(0.145639,4)

// 扁平化数据---就是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组。
        let listData = [{
            arr: [1, 2, 3, 4, 5, 1, 2, 3, 4, 4],
            name: 1231231,
            age: 123
        }]
        const loopSearch = (list, key) => {
            let res = [];
            if (list) {
                res = list.concat(
                    ...list
                        .map(item => {
                            if (item[key] instanceof Array && item[key].length > 0) {
                                return loopSearch(item[key], key);
                            }
                            return null;
                        })
                        .filter(o => o instanceof Array && o.length > 0),
                );
            }
            return res;
        };
        console.log(loopSearch(listData, 'arr'));
        /* 打印
     [{…}, 1, 2, 3, 4, 5, 1, 2, 3, 4, 4]
            0: {arr: Array(10), name: 1231231, age: 123}
            1: 1
            2: 2
            3: 3
            4: 4
            5: 5
            6: 1
            7: 2
            8: 3
            9: 4
            10: 4
            length: 11
            [[Prototype]]: Array(0)
        **/

	/**
     * 根据 key1 在 arr 中遍历查找 value，并返回匹配数据的 key2
     * @param {Array} arr 需要遍历的数组
     * @param {any} value 输入数据
     * @param {string} key1 查找字段（默认id）
     * @param {string} key2 输出字段（默认name）
     */
    export const formatter = (arr, value, key1, key2) => {
        if (!arr) return value;
        if (!(arr instanceof Array)) return value;

        const k1 = key1 || 'id';
        const k2 = key2 || 'name';

        for (let i = 0; i < arr.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (arr[i][k1] == value) {
                return arr[i][k2];
            }
        }
        return value;
    };

    /**
     * 获取cookie
     * @param {string} NameOfCookie 要获取的cookie键名
     */
    export const getCookie = NameOfCookie => {
        const aCookie = document.cookie.split('; ');
        for (let i = 0; i < aCookie.length; i++) {
            const aCrumb = aCookie[i].split('=');
            if (NameOfCookie === aCrumb[0]) return unescape(aCrumb[1]);
        }
        return null;
    };

    /**
     * 清除cookie
     * @param {Array} value 需要清除的数组
     */
    export const clearCookie = value => {
        const exp = new Date();
        exp.setMonth(exp.getMonth() - 1);
        value.forEach(item => {
            document.cookie = `${item}='';expires=${exp.toGMTString()};domain=.sangon.com;path=/`;
        });
    };


	/**
     * 毫秒转天-小时-分钟-秒
     * @param {number} time 需要转的毫秒数
     */
    export const handleTime = time => {
        const days = time / 1000 / 60 / 60 / 24;
        const daysRound = Math.floor(days);
        const hours = time / 1000 / 60 / 60 - 24 * daysRound;
        const hoursRound = Math.floor(hours) < 10 ? '0' + Math.floor(hours) : Math.floor(hours);
        const minutes = time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound;
        const minutesRound = Math.floor(minutes) < 10 ? '0' + Math.floor(minutes) : Math.floor(minutes);
        const seconds =
            time / 1000 - 24 * 60 * 60 * daysRound - 60 * 60 * hoursRound - 60 * minutesRound;
        const secondRound = Math.floor(seconds) < 10 ? '0' + Math.floor(seconds) : Math.floor(seconds);
        if (daysRound)
            return daysRound + 'D ' + ' ' + hoursRound + ':' + minutesRound + ':' + secondRound;
        return hoursRound + ':' + minutesRound + ':' + secondRound;
    };


    /**
     * 递归更改键名，用于TreeSelect
     * @param {Array} arr 后端传入的数据结构
     */
    export const mapTree = (arr, title = 'name', value = []) => {
        let newVal = {};
        value.forEach(item => {
            newVal = { [item]: arr[item], ...newVal };
        });
        return {
            title: arr[title],
            value: JSON.stringify(newVal),
            children:
                Array.isArray(arr.children) && arr.children.length > 0
                    ? arr.children.map(i => mapTree(i, title, value))
                    : [],
        };
    };


    /**
     * 加法函数，用来得到精确的加法结果
     * @param {Number} arg1
     * @param {Number} arg2
     */
    export const numberAdd = (arg1, arg2) => {
        const r1 = deal(arg1);
        const r2 = deal(arg2);
        const m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    };

    /**
     * 乘法函数，用来得到精确的乘法结果
     * @param {Number} arg1
     * @param {Number} arg2
     */
    export const numberMul = (arg1, arg2) => {
        let m = 0;
        m += deal(arg1);
        m += deal(arg2);
        const r1 = Number(arg1.toString().replace('.', ''));
        const r2 = Number(arg2.toString().replace('.', ''));
        return (r1 * r2) / Math.pow(10, m);
    };


    /**
     * 除法函数，用来得到精确的除法结果
     * @param {Number} arg1
     * @param {Number} arg2
     */
    export const numberDiv = (arg1, arg2) => {
        const t1 = deal(arg1);
        const t2 = deal(arg2);
        const r1 = Number(arg1.toString().replace('.', ''));
        const r2 = Number(arg2.toString().replace('.', ''));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    };
    /**
     * 下载方法
     * @param {Number} arg1
     * @param {Number} arg2
     */
    export const download = (arg1, arg2) => {
        var blob = new Blob([result]);
        var URL = window.URL || window.webkitURL;
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', objectUrl);
        a.download = `${reportTitleDownloadName}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
    /**
     * 打印方法
     * @param {Number} arg1
     * @param {Number} arg2
     */
  	const printExpressOrderEvent = (file?: any) => {

        // type也可以是PDF类型
		const blob: any = new Blob([file], { type: 'image/png' });


		const reader: any = new FileReader();

		reader.readAsText(blob, 'utf-8'); // 将流文件转成 String

		reader.onload = () => {
			try {
				// 1.返回的不是流文件, 判断status状态， 异常提示
				const result: { status: boolean; message: string } = JSON.parse(reader.result);
				if (!result.status) {
					message.error(
						`打印调用异常：${result.message ? result.message : '获取文件失败'}`,
					);
				}
			} catch (error) {
				// 2.返回的是流
				let url: any = null;

				if (window.webkitURL !== undefined) {
					try {

						url = window.webkitURL.createObjectURL(blob);

					} catch (err: any) {
						message.error(`打印地址异常`);
					}

				} else if (window.URL !== undefined) {
					try {

						url = window.URL.createObjectURL(blob);

					} catch (err: any) {
						message.error(`打印地址异常`);
					}
				}
				if (url) {
					setPrintData(url);
				}
			}
		};

	};


```



