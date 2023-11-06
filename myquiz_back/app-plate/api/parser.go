package api

import (
	"errors"
	"fmt"
	"net/http"
	"reflect"
	"strconv"

	"github.com/gin-gonic/gin"
)

func isPointer(inst interface{}) bool {
	val := reflect.ValueOf(inst)
	return val.Kind() == reflect.Pointer
}

// stringのフィールドのセット関数
func setValueString(pname string, required bool, val *reflect.Value, c *gin.Context) error {
	pnameValue := QueryAndPostForm(pname, c)

	if !val.CanSet() {
		return errors.New("It can't set Value")
	}

	if pnameValue == "" && required {
		return errors.New("It has no value")
	}

	val.SetString(pnameValue)
	return nil
}

// intのフィールドのセット関数
func setValueInt(pname string, required bool, val *reflect.Value, c *gin.Context) error {
	pnameStr := QueryAndPostForm(pname, c)

	if !val.CanSet() {
		return errors.New("It can't set Value")
	}

	if pnameStr == "" && !required {
		val.SetInt(0)
		return nil
	}

	pnameVal, err := strconv.Atoi(pnameStr)
	if err != nil {
		return err
	}

	val.SetInt(int64(pnameVal))
	return nil
}

func setValueStringSlice(pname string, required bool, val *reflect.Value, c *gin.Context) error {
	pnameStrArray := QueryAndPostFormArray(pname, c)

	if required && len(pnameStrArray) == 0 {
		msg := fmt.Sprintf("`%s` is required", pname)
		return errors.New(msg)
	}

	n := len(pnameStrArray)
	sliceType := reflect.SliceOf(reflect.TypeOf(""))
	value := reflect.MakeSlice(sliceType, n, n)

	for i, v := range pnameStrArray {
		value.Index(i).SetString(v)
	}

	val.Set(value)
	return nil
}

func setValueIntSlice(pname string, required bool, val *reflect.Value, c *gin.Context) error {
	pnameStrArray := QueryAndPostFormArray(pname, c)
	pnameValues := []int{}

	for _, str := range pnameStrArray {
		num, err := strconv.Atoi(str)
		if err != nil {
			return err
		}
		pnameValues = append(pnameValues, num)
	}

	if required && len(pnameValues) == 0 {
		msg := fmt.Sprintf("`%s` is required", pname)
		return errors.New(msg)
	}

	sliceType := reflect.SliceOf(reflect.TypeOf(0))
	value := reflect.MakeSlice(sliceType, len(pnameValues), len(pnameValues))

	for i, v := range pnameValues {
		value.Index(i).SetInt(int64(v))
	}

	val.Set(value)
	return nil
}

func setValue(filed *reflect.StructField, val *reflect.Value, c *gin.Context) error {
	//フィールドに定義されているアノテーションの解析
	typeName := filed.Type
	pname := filed.Tag.Get("pname")
	require := filed.Tag.Get("prequire") != "no"

	//pnameアノテーションがないフィールドは無視
	if pname == "" {
		return nil
	}

	if !val.CanSet() {
		return errors.New("It can't set Value")
	}

	//フィールドの型によってセット関数を分岐
	switch typeName.Kind() {
	case reflect.String:
		err := setValueString(pname, require, val, c)
		if err != nil {
			return err
		}
		return nil
	case reflect.Int:
		err := setValueInt(pname, require, val, c)
		if err != nil {
			return err
		}
		return nil
	case reflect.Slice:

		elementType := typeName.Elem()

		switch elementType.Kind() {
		case reflect.Int:
			return setValueIntSlice(pname, require, val, c)
		case reflect.String:
			return setValueStringSlice(pname, require, val, c)
		}

	}

	//セット関数が用意されている方以外はエラーを投げる
	return errors.New("It's not allowed Type")
}

// instはポインターのみ
// パーサー本体
// パラメータの名前は`pname`, 空白許容は`prequire`で行う

func Myparser(c *gin.Context, inst interface{}) error {
	if !isPointer(inst) {
		return errors.New("inst is not Pointer( this Function Allow Pointer Only)")
	}

	instType := reflect.TypeOf(inst).Elem()
	numFields := instType.NumField()

	val := reflect.ValueOf(inst).Elem()

	for i := 0; i < numFields; i++ {
		filed := instType.Field(i)

		filedval := val.FieldByName(filed.Name)
		err := setValue(&filed, &filedval, c)

		if err != nil {
			fmt.Println("[Log] MyParser : ", err)
			pname := filed.Tag.Get("pname")
			msg := fmt.Sprintf("パラメータ`%s`で不正な値が入力されています", pname)

			result := MakeBadAPIResult(msg, nil)
			c.JSON(http.StatusBadRequest, result)
			return err
		}
	}

	return nil
}
