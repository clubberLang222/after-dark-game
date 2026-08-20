Option Explicit
Dim sh, fso, root, bat, nodeModules, distIndex
Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(WScript.ScriptFullName)
bat = root & "\Install-and-Play.bat"

If Not fso.FileExists(bat) Then
  MsgBox "Install-and-Play.bat is missing." & vbCrLf & root, 16, "After Dark"
  WScript.Quit 1
End If

nodeModules = root & "\node_modules\react\package.json"
distIndex = root & "\dist\index.html"

If fso.FileExists(nodeModules) And fso.FileExists(distIndex) Then
  sh.CurrentDirectory = root
  sh.Run "cmd /c npm start", 7, False
  WScript.Sleep 1500
  sh.Run "http://127.0.0.1:5173/", 1, False
Else
  sh.Run "cmd /c """ & bat & """", 1, False
End If
