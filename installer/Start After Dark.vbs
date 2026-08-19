Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(WScript.ScriptFullName)
bat = root & "\Install-After-Dark.bat"
If Not fso.FileExists(bat) Then
  MsgBox "Install-After-Dark.bat missing.", 16, "After Dark"
  WScript.Quit 1
End If
sh.Run "cmd /c """ & bat & """", 1, False
