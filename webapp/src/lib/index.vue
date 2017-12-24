<script>
    import Request from './ajax.js';
    export default {
        name: 'Uploader',
        props: {
            test: {
                type: String
            },
            size: {
                type: String
            },
            limit: {
                type: Array
            }
        },
        data() {
            return {
                fileList: [],
                placeholder: '',
                fileIcon: ''
            }
        },
        mounted() {
            console.log(this.test);
        },
        methods: {
            readFile(file) {
                return new Promise((resolve, reject) => {
                    let fileReader = new FileReader();
                    fileReader.onload = (res) => {
                        // console.log(res.target.result);
                        resolve(res.target.result);
                    }
                    fileReader.readAsDataURL(file);
                });
            },
            upload(event) {
                const target = event.target;
                console.log(target.files);
                const files = target.files;
                const formData = new FormData();
                for(let file of files) {
                    let fileData;
                    if(file.type.indexOf('image') > -1) {
                        this.readFile(file).then((data) => { 
                            fileData = data; 
                            this.fileList.push({
                                file: file,
                                data: fileData,
                                progress: 0
                            });
                        });
                    } else {
                        fileData = '';
                        this.fileList.push({
                            file: file,
                            data: fileData,
                            progress: 0
                        });
                    }
                    formData.append('file', file);
                }
                console.log(formData);
            }
        }
    }
</script>
<template>
    <div class="uploader">
        <div class="file-button">
            <!--multiple="multiple" TODO: 多文件上传, 多文件进度条, 取消上传, 断点续传-->
            <input id="uploader-fileSelect" type="file" name="file" class="fileSelect" v-on:change="upload"/>
            <label for="uploader-fileSelect" class="fileLabel">点击上传</label>
        </div>
        <ul class="file-list" v-for="file in fileList">
            <li class="selected">
                <div class="preview">
                    <img :src="file.data" class="preview-icon" />
                </div>
                <div class="fileInfo">
                    <div class="fileName">{{ file.file.name }}</div>
                    <div class="progress-box">
                        <span class="persent">{{ file.progress }}%</span>
                        <div class="progress" :style="{ width: `${file.progress}%` }"></div>
                    </div>
                </div>
                <label class="selected-button">
                    <i></i>
                </label>
                <i class="icon-close">&chi;</i>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .file-button {
        width: 100px;
        height: 30px;
        line-height: 30px;
    }
    .fileLabel {
        display: block;
        width: 100%;
        height: 100%;
        background: #409eff;
        color: #fff;
        text-align: center;
        font-weight: 900;
    }
    .fileSelect {
        display: none;
    }
    .file-list {
        list-style: none;
        padding: 0;
        width: 100%;
        overflow: hidden;
    }
    .selected {
        float: left;
        position: relative;
        box-sizing: border-box;
        margin: 10px 0;
        width: 100%;
        padding: 0 10px 0 100px;
        border: 1px solid #eee;
        border-radius: 5px;
        height: 100px;
        line-height: 100px;
        overflow: hidden;
    }
    .preview {
        float: left;
        margin-top: 10px;
        margin-left: -90px;
        width: 80px;
        height: 80px;
        overflow: hidden;
    }
    .preview-icon {
        width: 120%;
        height: 100%;
    }
    .fileInfo {
        display: block;
        position: relative;
        width: 60%;
        max-width: 500px;
        min-width: 250px;
        height: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .fileName {
        width: 80%;
    }
    .selected-button {
        position: absolute;
        right: -17px;
        top: -7px;
        width: 46px;
        height: 26px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 1px 1px #ccc;
    }
    .icon-close {
        display: none;
        position: absolute;
        top: 5px;
        right: 5px;
        width: 15px;
        height: 15px;
        line-height: 15px;
        cursor: pointer;
        opacity: .75;
        color: #606266;
        text-align: center;
        font-size: 10px;
    }
    .progress-box {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 100%;
        text-align: right;
    }
    .progress {
        position: absolute;
        top: 60%;
        height: 5px;
        border-radius: 100px;
        background: #409eff;
    }
</style>
