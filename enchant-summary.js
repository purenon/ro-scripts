/**
 * 特殊なエンチャント効果一覧ページを整理するスクリプト
 * 1. https://ragnarokonline.gungho.jp/gameguide/system/equip-powerup/special-enchant-list.html にアクセス
 * 2. 開発ツールを開く
 * 3. コンソールにこのスクリプトをコピペして実行
 * 
 * エンチャント一覧のテーブルにidが付いてないので、class(table01)でdomを指定
 * ※table01ってクラスはページ内ではこのテーブルにしか付いてない
 */

// 整理したjson配列
const enchantJsonList = [];
// hrefにセットされてるuriその1
const urlType1 = 'https://rotool.gungho.jp/monster/item.php?item=';
// hrefにセットされてるuriその2
const urlType2 = 'https://rotool.gungho.jp/item/';
// グルーピングするエンチャント(can_grouping:trueはkey名をそのままグループ名として使用)
//   keys: このグループに紐づくエンチャント(includesでひっかけるので部分一致)
//   can_grouping: キーをそのままグループ名に使用
const enchantGroups = {
  default_group: { // グルーピングに使うキーがそのままグループ名になりそうなやつ
    keys: [
      '潜在解放', '潜在覚醒', '氷華の魔力', , '雪花の魔力', '属性付与', 'Special', 'Extra',
      '鋭利', '攻撃速度', '先鋭', '闘志', '魔力', '名弓', 'MaxHP', 'プレイヤー耐性', '強撃', '増幅', 'Atk', 'Matk', '星雲',
    ],
    can_grouping: true,
  },
  'ステ強化(時魔術師の指輪)': {
    keys: ['熊の力', '暴走した魔力', '光速', '鋼鎧', '大鷲の眼光', '幸運な日'],
  },
  'ステ強化(森羅万象)': {
    keys: ['覇王', '豪傑', '真理の解放', '死の欲動', '森羅万象'],
  },
  'シュミッツ': {
    keys: ['閃光', '強剛', '天弓', '新暦', '剛体', '白雲'],
  },
  '属性耐性弱': {
    keys: ['バーン', 'ゲイル', 'フラッド', 'クレイ', 'グラッジ', 'ウーア', 'ベノム', 'セイクレッド', 'ニヒツ', 'デスペリア'],
  },
  '属性耐性(100)': {
    keys: ['イミューン'],
  },
  '漢字武器': {
    keys: ['疾風', '天地', '水天', '百火'],
  },
  'MVP': {
    keys: [
      '英雄の凱歌', '起源の王', '豊穣の女神', '厄災の魔将', '異境の統轄者', '知識の探求者', 'シンソウの王',
      '祈りの晩鐘', '最果ての支配者', '殺意の怨念', '天地崩壊', '悠遠なる天上の都', '時間の注視者'
    ],
  },
  '星座': {
    keys: ['魔獣の爪牙', '不滅の肉体', '叡知の王冠', '根源への到達', '蒼穹の覇者', '天与の才', '星界の暴君'],
  },
  'レジスト': {
    keys: ['レジスト'],
  },
  '長司祭': {
    keys: ['大司教', '大聖堂', '治癒'],
  },
  '思念体': {
    keys: ['増幅された怨望', '理性と記憶の残滓'],
  },
  'オートマティック': {
    keys: ['U-PowerArmor', 'U-PowerLeg', 'U-PowerWing', 'U-PowerShield'],
  },
  'スキル使用可能': {
    keys: ['スキル石', 'マグニフィカート', 'サイト', 'オーディンの力', 'スキル石(ファイアーウォールLv10)'],
  },
};

// 除外しなきゃいけないのを持ってるグループ名
/*
const hasExclude = {
  '魔力': ['氷華', '暴走', '極限', '雪花'],
  '天地': ['天地崩壊'],
  '増幅': ['怨望'],
};
*/

// HTMLを解析してjson object化
[...document.getElementsByClassName('table01')[0].rows].forEach(it => {
    [...it.cells].forEach(cIt => {
      [...cIt.children].forEach(gcIt => {
        let groupName = undefined;
        
        const enchantName = gcIt.innerText;

        Object.keys(enchantGroups).forEach(key => {
          const item = enchantGroups[key];
          if (groupName) {
            // すでにグループ名が取得できている場合は無視
            return;
          }
          item.keys.forEach(groupIt => {
            if (groupIt === '魔力') {
              // 魔力は余計なもんが多い
              if (enchantName.includes(groupIt) && !enchantName.includes('氷華') && !enchantName.includes('暴走') && !enchantName.includes('極限') && !enchantName.includes('雪花')) {
                groupName = item.can_grouping? groupIt : key;
              }
            } else if (groupIt === '天地') {
              // 天地崩壊はひっかけない
              if (enchantName.includes(groupIt) && !enchantName.includes('天地崩壊')) {
                groupName = item.can_grouping? groupIt : key;
              }
            } else if (groupIt === '増幅') {
              // 天地崩壊はひっかけない
              if (enchantName.includes(groupIt) && !enchantName.includes('怨望')) {
                groupName = item.can_grouping? groupIt : key;
              }
            } else {
              if (enchantName.includes(groupIt)) {
                groupName = item.can_grouping? groupIt : key;
              }
            }
          });
        });

        enchantJsonList.push({
          id: gcIt.href.replace(urlType1, '').replace(urlType2, ''), // urlは2パターンあるので全部消してIDのみにする
          enchant_name: enchantName,
          group_name: groupName,
          no: parseInt(enchantName.replace(groupName, ''), 10) || undefined, // 連番ついてるやつはここで数字部分のみが入る
        });
      });
    });
});

// jsonをソート(グループ名 -> 連番 -> 名称)
enchantJsonList.sort((a, b) => {
  if (a.group_name < b.group_name) return -1;
  if (a.group_name > b.group_name) return 1;
  if (a.no < b.no) return -1;
  if (a.no > b.no) return 1;
  if (a.enchant_name < b.enchant_name) return -1;
  if (a.enchant_name > b.enchant_name) return 1;
});

// jsonが欲しい場合はここのconsole.logを有効に
// console.log(enchantJsonList);


// こっから整形した状態のhtml出力
const table = '<table style="border-collapse:collapse;width:100%; margin:20px;">';
const tr = '<tr>';
const td = '<td style="width:200px;border: solid 1px;">';
const td2 = '<td style="width:200px;border: solid 1px;background:#f5fffa;">';
let exportString = `<h2>記事内ジャンプ用リンク</h2>${ table }`;
// 横の出力数
const rowSize = 4;

// ジャンプ用のリンクを作る
const jumpGroup = ((arr, size) => arr.flatMap((_, i, a) => i % size ? [] : [a.slice(i, i + size)]))(Array.from(new Set(enchantJsonList.map(i => i.group_name))), 4);
jumpGroup.forEach(items => {
  let row = tr;
  items.forEach(key => {
    row += td2;
    row += `<b><a href="#${ key? key : '未分類' }">${ key? key : '未分類' }</a></b><br />`;
    row += '</td>';
  });
  if (items.length < rowSize) {
    // 列数に満たない場合は要素を追加して合わせる
    for (let i = 0; i < rowSize - items.length; i++) {
      row += `${ td2 }</td>`;
    }
    row += '</tr>'
  }  
  exportString += row;
});
exportString += '</table><br />';

exportString += '<hr />';

// グルーピングを優先してテーブルタグに変換する
Array.from(new Set(enchantJsonList.map(i => i.group_name))).forEach(key => {
  exportString += `<h2><a name="${ key? key : '未分類' }" style="color:inherit;text-decoration: none;">${ key? key : '未分類' }系</a></h2>${ table }`;
  const target = enchantJsonList.filter(i => i.group_name === key);
  ((arr, size) => arr.flatMap((_, i, a) => i % size ? [] : [a.slice(i, i + size)]))(target, rowSize).forEach(row => {
    let rowHtml = tr;
    row.forEach(item => {
      rowHtml += td;
      rowHtml += `<a href="${ urlType2 }${ item.id }" target="_blank">${ item.enchant_name.replace('<', '&lt;').replace('>', '&gt;') }</a>`
      rowHtml += '</td>';
    });
    if (row.length < rowSize) {
      // 列数に満たない場合は要素を追加して合わせる
      for (let i = 0; i < rowSize - row.length; i++) {
        rowHtml += `${ td }</td>`;
      }
    }
    rowHtml += '</tr>'
    exportString += rowHtml;
  });
  exportString += '</table><br />';
});

// 開発ツールでコピーするために標準出力へ
console.log(exportString);

