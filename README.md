# ro-scripts
RO関連のリポジトリ
ブログの記事のために使用
https://yakitoriteisyoku.exblog.jp/

# job-items.js
職装備をhtmlのtableタグで出力するためのスクリプト
### 使い方
* 装備が追加されたら`itemList`配列にオブジェクト形式で情報を追加(内容はソース参照)
* どっか適当なページで開発者ツールでも開いてスクリプトを全部コピペして実行。
* 出力されたものを適当なhtmlファイルに張り付ける


# enchant-summary.js
ROのエンチャントページを整形するためのスクリプト
### 使い方
* [ROの公式の特殊なエンチャント効果一覧ページ](https://ragnarokonline.gungho.jp/gameguide/system/equip-powerup/special-enchant-list.html)を開く
* 開発者ツールを開いてスクリプトを全部コピペして実行
* 出力されたものを適当なhtmlファイルに張り付ける

### 分類グループを増やしたい場合
* enchantGroups変数に以下の形式でオブジェクトを追加
  - エンチャント名はその文字列を含むかどうかでひっかけるので、フルで入れる必要はありません
```
'任意のグループ名': {
  keys: ['対象のエンチャントの名前の先頭部分'],
}
```
* 以下の箇所では除外すべきものを手動でやってます(魔力でひっかけると氷華の魔力や暴走した魔力、極限の魔力や雪花の魔力が引っ掛かるため)
  - https://github.com/purenon/ro-scripts/blob/main/enchant-summary.js#L95-L110
* 今後こういう除外項目を増やす場合はここに`else if`で追加
