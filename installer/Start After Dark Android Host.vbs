Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(WScript.ScriptFullName)
bat = root & "\INSTALL-AND-RUN.bat"
If Not fso.FileExists(bat) Then
  MsgBox "INSTALL-AND-RUN.bat missing.", 16, "After Dark"
  WScript.Quit 1
End If
sh.Run "cmd /c """ & bat & """", 1, False
