/**
 * @job 対応する職業名。jobSortないの文字列と完全一致させる
 * @item_name 対象のアイテム名
 * @item_id 対象のアイテムID。これで公式ツールへのURLを作成する
 * @part 装備部位。partIndexで指定されている数字をセット
 * @enchant 「潜在解放（職業名〇〇）」の〇〇に入るローマ数字
 * @enchant_id エンチャントのアイテムID。これで公式ツールへのURLを作成する
 * @enchant_set エンチャントのセット（豪傑とか真理の解放）
 * @is_bomb true: 爆破エンチャ
 */
const itemList = [
  // jobセットしなければ抽出対象にならないので1行目をコピーして追加していく
  { job: '', item_name: '', item_id: '', part: 0, enchant: '', enchant_id: '', enchant_set: '', is_bomb: false },
  { job: 'ドラゴンナイト', item_name: 'ドラゴンサークレット', item_id: '400420', part: 1, enchant: 'II', enchant_id: '312040', enchant_set: '豪傑', is_bomb: false },
  { job: 'ドラゴンナイト', item_name: '紫電一閃', item_id: '400481', part: 1, enchant: 'III', enchant_id: '312300', enchant_set: '豪傑', is_bomb: false },
  { job: 'インペリアルガード', item_name: '白きカーリッツバーグ騎士団のヘルム', item_id: '400454', part: 1, enchant: 'II', enchant_id: '312035', enchant_set: '真理の解放', is_bomb: false },
  { job: 'インペリアルガード', item_name: 'ウォルフライエ', item_id: '400582', part: 1, enchant: 'III', enchant_id: '312917', enchant_set: '豪傑', is_bomb: false },
  { job: 'アークメイジ', item_name: 'クロックワイズ', item_id: '400408', part: 1, enchant: 'II', enchant_id: '312031', enchant_set: '真理の解放', is_bomb: false },
  { job: 'アークメイジ', item_name: 'スペキュレーション', item_id: '450401', part: 4, enchant: 'V', enchant_id: '312928', enchant_set: '真理の解放', is_bomb: false },
  { job: 'アークメイジ', item_name: 'エスタブリッシュ', item_id: '490396', part: 9, enchant: 'III', enchant_id: '312473', enchant_set: '真理の解放', is_bomb: true },
  { job: 'エレメンタルマスター', item_name: 'ガーデンオブヘヴン', item_id: '400645', part: 1, enchant: 'V', enchant_id: '312942', enchant_set: '真理の解放', is_bomb: false },
  { job: 'エレメンタルマスター', item_name: 'ロードオブエレメンタル', item_id: '490359', part: 9, enchant: 'II', enchant_id: '312037', enchant_set: '真理の解放', is_bomb: true },
  { job: 'エレメンタルマスター', item_name: 'ティルナノーグ', item_id: '450411', part: 4, enchant: 'VI', enchant_id: '312943', enchant_set: '真理の解放', is_bomb: false },
  { job: 'ウィンドホーク', item_name: '天下無敵の紋帽子', item_id: '400453', part: 1, enchant: 'II', enchant_id: '312036', enchant_set: '豪傑', is_bomb: false },
  { job: 'エレメンタルマスター', item_name: 'エレメンタルジュエル', item_id: '490453', part: 9, enchant: 'III', enchant_id: '312303', enchant_set: '真理の解放', is_bomb: true },
  { job: 'ウィンドホーク', item_name: 'アルタイルハット', item_id: '400506', part: 1, enchant: 'III', enchant_id: '312646', enchant_set: '豪傑', is_bomb: false },
  { job: 'ウィンドホーク', item_name: 'リングオブアルテミス', item_id: '490471', part: 9, enchant: 'IV', enchant_id: '312918', enchant_set: '豪傑', is_bomb: true },
  { job: 'ウィンドホーク', item_name: 'リュカントロポス', item_id: '450379', part: 4, enchant: 'VI', enchant_id: '312939', enchant_set: '豪傑', is_bomb: false },
  { job: 'トルバドゥール/トルヴェール', item_name: '情熱あふれるラビットリボン', item_id: '400581', part: 1, enchant: 'I', enchant_id: '312919', enchant_set: '豪傑', is_bomb: false },
  { job: 'カーディナル', item_name: 'リス耳フード（アルビノ）', item_id: '400416', part: 1, enchant: 'III', enchant_id: '312304', enchant_set: '豪傑', is_bomb: false },
  { job: 'カーディナル', item_name: 'ストライプリボンハット', item_id: '400505', part: 1, enchant: 'IV', enchant_id: '312645', enchant_set: '真理の解放', is_bomb: false },
  { job: 'カーディナル', item_name: '着ぐるみペタル（アルビノ）', item_id: '450402', part: 4, enchant: 'VII', enchant_id: '312945', enchant_set: '豪傑', is_bomb: false },
  { job: 'カーディナル', item_name: '枢機卿の指輪', item_id: '490244', part: 9, enchant: 'II', enchant_id: '312038', enchant_set: '真理の解放', is_bomb: true },
  { job: 'カーディナル', item_name: 'ペタルの尻尾（アルビノ）', item_id: '490429', part: 9, enchant: 'V', enchant_id: '312691', enchant_set: '豪傑', is_bomb: true },
  { job: 'インクイジター', item_name: '異端審問官のヴェール', item_id: '400556', part: 1, enchant: 'II', enchant_id: '312034', enchant_set: '豪傑', is_bomb: false },
  { job: 'シャドウクロス', item_name: 'シックピオニー', item_id: '400437', part: 1, enchant: 'II', enchant_id: '312039', enchant_set: '豪傑', is_bomb: false },
  { job: 'シャドウクロス', item_name: '百花の愛', item_id: '400711', part: 1, enchant: 'VI', enchant_id: '313283', enchant_set: '豪傑', is_bomb: false },
  { job: 'シャドウクロス', item_name: 'ヘイトレッドダークネス', item_id: '450410', part: 4, enchant: 'VII', enchant_id: '313284', enchant_set: '豪傑', is_bomb: false },
  { job: 'アビスチェイサー', item_name: 'ヤマネコニット帽（白）', item_id: '400438', part: 1, enchant: 'II', enchant_id: '312033', enchant_set: '豪傑', is_bomb: false },
  { job: 'アビスチェイサー', item_name: 'サタニッククラウン', item_id: '400649', part: 1, enchant: 'VI', enchant_id: '312931', enchant_set: '豪傑', is_bomb: false },
  { job: 'アビスチェイサー', item_name: 'イントゥジアビス', item_id: '490410', part: 9, enchant: 'III', enchant_id: '312397', enchant_set: '真理の解放', is_bomb: true },
  { job: 'マイスター', item_name: 'イエローキティヘッドフォン', item_id: '400592', part: 1, enchant: 'II', enchant_id: '312044', enchant_set: '豪傑', is_bomb: false },
  { job: 'マイスター', item_name: 'マグマイグニスキャップ', item_id: '400688', part: 1, enchant: 'V', enchant_id: '312978', enchant_set: '豪傑', is_bomb: false },
  { job: 'マイスター', item_name: 'エレクトロンブースター', item_id: '490524', part: 9, enchant: 'IV', enchant_id: '312959', enchant_set: '豪傑', is_bomb: true },
  { job: 'マイスター', item_name: 'パワーマシンアーム', item_id: '490602', part: 9, enchant: 'VI', enchant_id: '313198', enchant_set: '豪傑', is_bomb: true },
  { job: 'バイオロ', item_name: 'ツートンキャップ', item_id: '400421', part: 1, enchant: 'II', enchant_id: '312043', enchant_set: '豪傑', is_bomb: false },
  { job: 'バイオロ', item_name: '白い機械植物帽', item_id: '400722', part: 1, enchant: 'V', enchant_id: '312956', enchant_set: '豪傑', is_bomb: false },
  { job: 'バイオロ', item_name: 'ケミカルレジスタントグローブ', item_id: '490428', part: 9, enchant: 'III', enchant_id: '312301', enchant_set: '豪傑', is_bomb: true },
  { job: 'ナイトウォッチ', item_name: 'スチームローラー', item_id: '400601', part: 1, enchant: 'III', enchant_id: '312970', enchant_set: '豪傑', is_bomb: false },
  { job: 'ナイトウォッチ', item_name: '決闘者のゴールドコイン', item_id: '490523', part: 9, enchant: 'IV', enchant_id: '312971', enchant_set: '豪傑', is_bomb: true },
  { job: '蜃気楼＆不知火', item_name: '白狐耳の笠', item_id: '400602', part: 1, enchant: 'III', enchant_id: '312973', enchant_set: '豪傑', is_bomb: false },
  { job: '蜃気楼＆不知火', item_name: '桜の白魔女帽子', item_id: '400721', part: 1, enchant: 'IV', enchant_id: '312974', enchant_set: '真理の解放', is_bomb: false },
  { job: '天帝', item_name: '天涯極地の腕輪', item_id: '490501', part: 9, enchant: 'III', enchant_id: '312964', enchant_set: '豪傑', is_bomb: true },
  { job: 'ソウルアセティック', item_name: '霊道冠', item_id: '400644', part: 1, enchant: 'IV', enchant_id: '312968', enchant_set: '真理の解放', is_bomb: false },
  { job: 'ソウルアセティック', item_name: 'ブーゲンビリア', item_id: '450404', part: 4, enchant: 'V', enchant_id: '312980', enchant_set: '真理の解放', is_bomb: false },
  { job: 'ソウルアセティック', item_name: '五行封神陣', item_id: '490481', part: 9, enchant: 'II', enchant_id: '312966', enchant_set: '真理の解放', is_bomb: true },
  { job: 'ハイパーノービス', item_name: 'マーリン柄の丸帽子', item_id: '400672', part: 1, enchant: 'VII', enchant_id: '313275', enchant_set: '豪傑', is_bomb: false },
  { job: 'スピリットハンドラー', item_name: 'ぷにぷにあんよのスタンプフード', item_id: '400593', part: 1, enchant: 'II', enchant_id: '312975', enchant_set: '豪傑', is_bomb: false },
  { job: 'スピリットハンドラー', item_name: '白猫の魔女帽子', item_id: '400624', part: 1, enchant: 'IV', enchant_id: '312977', enchant_set: '真理の解放', is_bomb: false },
  { job: 'スピリットハンドラー', item_name: 'がおがおタイガーパジャマ', item_id: '450368', part: 4, enchant: 'VI', enchant_id: '313196', enchant_set: '豪傑', is_bomb: false },
  { job: 'スピリットハンドラー', item_name: 'ふかふかフォーンローブ', item_id: '450373', part: 4, enchant: 'VII', enchant_id: '313282', enchant_set: '真理の解放', is_bomb: false },
  { job: 'マイスター', item_name: 'ワールドオール', item_id: '450419', part: 4, enchant: 'IX', enchant_id: '313493', enchant_set: '豪傑', is_bomb: false },
  { job: 'インクイジター', item_name: 'レディアントピュリファイ', item_id: '450420', part: 4, enchant: 'VII', enchant_id: '313508', enchant_set: '豪傑', is_bomb: false },
  { job: 'ドラゴンナイト', item_name: 'リヴァイアサンヘルム', item_id: '400742', part: 1, enchant: 'X', enchant_id: '313446', enchant_set: '豪傑', is_bomb: false },
  { job: 'インペリアルガード', item_name: 'シェラタン', item_id: '450423', part: 4, enchant: 'XI', enchant_id: '313460', enchant_set: '真理の解放', is_bomb: false },
  { job: '蜃気楼＆不知火', item_name: '極意皆伝之巻', item_id: '490640', part: 9, enchant: 'X', enchant_id: '313479', enchant_set: '真理の解放', is_bomb: true },
  { job: 'カーディナル', item_name: 'ストライプホーリーローブ', item_id: '450425', part: 4, enchant: 'XIII', enchant_id: '313458', enchant_set: '真理の解放', is_bomb: false },
  { job: 'バイオロ', item_name: 'レリックランタン', item_id: '490656', part: 9, enchant: 'XI', enchant_id: '313466', enchant_set: '豪傑', is_bomb: true },
  { job: 'スピリットハンドラー', item_name: 'てちてちにゃんこのもこふわソックス', item_id: '490655', part: 9, enchant: 'XI', enchant_id: '313483', enchant_set: '豪傑', is_bomb: true },
  { job: 'ナイトウォッチ', item_name: '機械羽根のブルーヘアバンド', item_id: '400766', part: 1, enchant: 'IX', enchant_id: '313476', enchant_set: '豪傑', is_bomb: false },
  { job: 'マイスター', item_name: 'パワーマシンスーツ', item_id: '450432', part: 4, enchant: 'XII', enchant_id: '313454', enchant_set: '豪傑', is_bomb: false },
  { job: 'ドラゴンナイト', item_name: 'リヴァイアサンオーブ', item_id: '490678', part: 9, enchant: 'XI', enchant_id: '313447', enchant_set: '豪傑', is_bomb: true },
  { job: 'アークメイジ', item_name: 'ドロップオブセブンカラーズ', item_id: '490679', part: 9, enchant: 'X', enchant_id: '313448', enchant_set: '真理の解放', is_bomb: true },
  { job: '蜃気楼＆不知火', item_name: '白狐のお守り', item_id: '490691', part: 9, enchant: 'XI', enchant_id: '313480', enchant_set: '豪傑', is_bomb: true },
  { job: 'アークメイジ', item_name: '星魔術師の三角帽', item_id: '400787', part: 1, enchant: 'XI', enchant_id: '313449', enchant_set: '真理の解放', is_bomb: false },
];

// 部位の対応表。数字で指定してるのは、部位番号でソートして成型するため
partIndex = {
  1: '頭上段',
  2: '頭中段',
  3: '頭下段',
  4: '鎧',
  5: '武器',
  6: '盾',
  7: '肩にかけるもの',
  8: '靴',
  9: 'アクセサリ',
  10: 'アクセサリ(1)',
  11: 'アクセサリ(2)',
};

// 職の一覧。この順番で出力する
const jobSort = [
    'ドラゴンナイト',
    'インペリアルガード',
    'アークメイジ',
    'エレメンタルマスター',
    'ウィンドホーク',
    'トルバドゥール/トルヴェール',
    'カーディナル',
    'インクイジター',
    'シャドウクロス',
    'アビスチェイサー',
    'マイスター',
    'バイオロ',
    'ナイトウォッチ',
    '蜃気楼＆不知火',
    '天帝',
    'ソウルアセティック',
    'ハイパーノービス',
    'スピリットハンドラー',
]

// 出力用の情報保持のための配列
const exportTag = [];

jobSort.forEach(key => {
  // ジョブで絞り込んだうえで部位(番号)でソート
  itemList.filter(it => it.job === key).sort((a, b) => a.part - b.part).forEach((it, idx) => {
    if (idx === 0) {
      // このジョブで1つ目のレコードの場合はヘッダ情報を出力
      exportTag.push('<hr><table style="border-collapse:collapse;width:100%; margin:20px;">');
      exportTag.push('<tr>');
      exportTag.push('<th style="border: solid 1px;width:100px; background:#ffefd5">対象職業</th>');
      exportTag.push(`<th style="border-left: solid 1px;border-right: none;border-bottom: solid 1px;border-top: solid 1px;background:#f0f8ff;width:300px;">${ key }</th>`);
      exportTag.push('<th style="border-left: none;border-right: solid 1px;border-bottom: solid 1px;border-top: solid 1px;background:#f0f8ff;width:500px;"></th>');
      exportTag.push('</tr>');
    }
    exportTag.push('<tr>')
    exportTag.push(`<td style="border: solid 1px;">${ partIndex[it.part] || '' }</td>`);
    exportTag.push(`<td style="border: solid 1px;"><a href="https://rotool.gungho.jp/item/${ it.item_id }/" target="_blank">${ it.item_name }</a></td>`);
    exportTag.push(`<td style="border: solid 1px;">${ it.is_bomb? '&#x1f4a5;' : ''}<a href="https://rotool.gungho.jp/item/${ it.enchant_id }/" target="_blank">潜在解放(${ key }${ it.enchant })</a>(${ it.enchant_set }とセット)</td>`);
    exportTag.push('</tr>')
  });
  exportTag.push('</table>');
});

// 配列を全部結合してワンライナーで出力
console.log(exportTag.join(''));
