<!-- tinymc富文本 -->
<template>
    <editor
        ref="tinyMCE"
        v-model="myValue"
        :init="init"
        :disabled="disabled"
        @onClick="onClick">
    </editor>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/skins/ui/oxide/skin.css";
import "@/assets/tinymce/langs/zh_CN"; // 本地汉化
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/fullscreen" //全屏
import "tinymce/icons/default"; // 图标 -解决测试环境找不icon问题

export default {
    name: "tinymce",
    components: {
        Editor,
    },
    props: {
        //传入一个value，使组件支持v-model绑定
        value: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        plugins: {
            type: [String, Array],
            default:
                "lists link image media table wordcount fullscreen",
        },
        toolbar: {
            type: [String, Array],
            default:
                "undo redo |  formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image link media table | removeformat hr | fullscreen",
        },
        menubar: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            //初始化配置
            pendingFiles: [],
            init: {
                selector: "textarea",
                language_url: "@/asset/tinymce/langs/zh_CN.js", // 这里需要单独处理
                language: "zh_CN",
                skin_url: process.env.BASE_URL+'assets/tinymce/skins/ui/oxide/skin.min.css',
                content_css: process.env.BASE_URL+'assets/tinymce/skins/ui/oxide/content.min.css',
                plugins: this.plugins,
                toolbar: this.toolbar,
                toolbar_mode: "sliding",
                menubar: this.menubar,
                theme_advanced_resizing: false,
                deprecation_warnings: false,
                branding: false,
                statusbar: false,
                automatic_uploads: false,
                images_reuse_filename: true,
                //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler

                file_picker_callback: function (callback, value, meta) {
                    //文件分类
                    var filetype='.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
                    //后端接收上传文件的地址
                    var upurl='/demo/upfile.php';
                    //为不同插件指定文件类型及后端地址
                    switch(meta.filetype){
                        case 'image':
                            filetype='.jpg, .jpeg, .png, .gif';
                            break;
                        case 'media':
                            filetype='.mp3, .mp4';
                            break;
                        case 'file':
                            filetype='.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx';
                        default:
                    }

                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', filetype);

                    input.onchange = function(e) {
                        var file = e.target.files[0];
                        var reader = new FileReader();
                        reader.onload = function () {
                            // Note: Now we need to register the blob in TinyMCEs image blob
                            // registry. In the next release this part hopefully won't be
                            // necessary, as we are looking to handle it internally.
                            var id = 'blobid' + (new Date()).getTime();
                            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                            var base64 = reader.result.split(',')[1];
                            var blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);

                            // call the callback and populate the Title field with the file name
                            callback(blobInfo.blobUri(), { title: file.name });
                        };
                        reader.readAsDataURL(file)
                    };
                    input.click();
                },
                // 自定义图像上传处理
                images_upload_handler: (blobInfo, success, failure) => {
                    console.log("upload上传");
                    // const img = "data:image/jpeg;base64," + blobInfo.base64();
                    // success(img);
                },
                media_upload_handler: (blobInfo, success, failure) => {

                },
                resize: true,
            },
            myValue: this.value,
        };
    },
    mounted() {
        tinymce.init({});
    },
    methods: {
        //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
        //需要什么事件可以自己增加
        onClick(e) {
            this.$emit("onClick", e, tinymce);
        },
        clear() {
            this.myValue = "";
        },
        onSubmit() {
            const content = this.$refs.tinyMCE.editor.getContent();

            const formData = new FormData();
            formData.append('content', content);

            // 匹配所有图片和视频的src属性，支持Blob URL和Base64编码
            const fileSources = content.match(/src=["'](blob:.*?|data:[^;]+;base64,[^"']+)["']/gi);
            const fetchPromises = [];

            if (fileSources) {
                fileSources.forEach((src, index) => {
                    const match = src.match(/src=["'](blob:.*?|data:[^;]+;base64,([^"']+))["']/i);
                    const fileUrl = match[1];
                    if (fileUrl.startsWith('blob:')) {
                        // 处理Blob URL
                        fetchPromises.push(
                            fetch(fileUrl)
                            .then(res => res.blob())
                            .then(blob => {
                                formData.append(`file${index}`, blob, `file${index}`);
                            })
                        );
                    } else {
                        // 处理Base64编码
                        const base64Content = match[2];
                        const blob = this.dataURItoBlob(`data:image/jpeg;base64,${base64Content}`);
                        formData.append(`file${index}`, blob, `file${index}.jpg`);
                    }
                });

                Promise.all(fetchPromises).then(() => {
                    this.uploadData(formData);
                });
            } else {
                console.log('没有文件被上传。');
                this.uploadData(formData);
            }
        },
        dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
        },
        uploadData(formData) {
            // fetch('/your-server-endpoint', {
            //     method: 'POST',
            //     body: formData,
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Upload successful', data);
            //     // 清除或处理后续逻辑
            // })
            // .catch(error => {
            //     console.error('Upload error', error);
            // });
            console.log('Logging form data...');
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + (pair[1].name || 'Content'));
            }
            this.$emit("submit", formData);
        }
    },
    watch: {
        value(newValue) {
            this.myValue = newValue;
        },
        myValue(newValue) {
            this.$emit("input", newValue);
        },
    },
};
</script>
<style lang="scss">
.tox-tinymce-aux {
    z-index: 5000 !important;
}
</style>
