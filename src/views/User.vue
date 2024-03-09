<template>
  <!-- 添加用户功能按钮和弹窗 -->
  <div class="manage">
    <el-button @click="dialogVisible = true" type="primary" :icon="Plus">
      添加
    </el-button>
    <el-dialog v-model="dialogVisible" title="" width="40%" draggable>
      <!-- 点击添加按钮后显示的信息表单 -->
      <span>
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          class="demo-form-inline"
          status-icon
          :inline="true"
        >
          <el-form-item label="输入姓名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="输入年龄" prop="age">
            <el-input v-model="ruleForm.age" />
          </el-form-item>
          <el-form-item label="选择性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="选择性别">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-form-item prop="birth">
                <el-date-picker
                  v-model="ruleForm.birth"
                  type="date"
                  label="选择日期"
                  placeholder="选择日期"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="输入地址" prop="addr">
            <el-input v-model="ruleForm.addr" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm"> +添加 </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            <el-button @click="dialogVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
  <!-- 用户列表渲染 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="160px" />
    <el-table-column prop="sex" label="性别" width="160px">
      <template #default="scope">
        <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="160px" />
    <el-table-column prop="birth" label="出生日期" width="160px" />
    <el-table-column prop="addr" label="地址" width="250px" />
    <el-table-column prop="" label="操作">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button size="mini" type="danger" @click="dandleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts" name="User">
import { ref, reactive, computed, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { homeDatasStore } from "../store/home";
import { getUser, addUser, editUser, delUser } from "../api";
import { ElMessage, ElMessageBox } from "element-plus";

let operateFormLabel = reactive(
  computed(() => homeDatasStore().operateFormLabel)
); //左侧三分之一下面表单的数据来源
const tableData = ref([]); //表格数据
const modalType = ref(0); //0表示新增，1表示编辑
const dialogVisible = ref(false); //控制弹出是否显示

interface RuleForm {
  name: string;
  age: string;
  sex: string;
  birth: string;
  addr: string;
}
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "",
  age: "",
  sex: "",
  birth: "",
  addr: "",
});

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: "请输入姓名" }],
  age: [{ required: true, message: "请输入年龄" }],
  sex: [{ required: true, message: "请选择性别" }],
  birth: [{ required: true, message: "选择你的生日" }],
  addr: [{ required: true, message: "输入你的地址" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 后续对表单数据的处理
      if (modalType.value === 0) {
        addUser(formEl).then(() => {
          // 重新获取列表接口
          getList();
          console.log("调用了接口addUser");
        });
      } else {
        editUser(formEl).then(() => {
          // 重新获取列表接口
          getList();
        });
      }
      // 关闭弹窗
      dialogVisible.value = false;
    } else {
      // console.log("error submit!");
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

function handleEdit(row: any) {
  // console.log(row, "111");
  modalType.value = 1;
  // 对当前行数据进行深拷贝,不然会出错
  const rowData = JSON.parse(JSON.stringify(row));
  FormData = rowData;
}
function dandleDelete(row: any) {
  ElMessageBox.confirm("此操作将永久删除该信息，是否确认?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delUser({id:row.id}).then(() => {
        ElMessage({
          type: "success",
          message: "已删除",
        });
        getList(); // 重新获取列表
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消",
      });
    });
}
function handleAdd(row: any) {
  modalType.value = 0;
  dialogVisible.value = true;
  addUser().then(() => {
    // 重新获取列表接口
    getList();
    console.log("调用了接口addUser");
  });
}

function getList() {
  // 获取的列表数据
  getUser(getUser).then((data: any) => {
    tableData.value = data.list;
    // console.log(tableData.value);
    return tableData;
  });
}
onMounted(async () => {
  // 获取的列表数据
  getList();
});
</script>

<style lang="less" scoped>
.demo-form-inline .el-input {
  --el-input-width: 260px;
}

.demo-form-inline .el-select {
  --el-select-width: 260px;
}
.dialog-footer {
  margin-left: 75%;
}
</style>
