package tests

import "testing"

func TestBase(t *testing.T) {
	got := "Test Ok"
	want := "Test False"

	if got != want {
		t.Errorf("got : [%s] , experience : [%s]", got, want)
	}
}
