<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mail</title>
</head>

<body>
    <div id="mail">
        <table class="mail-table" style="width: 100%">
            <tbody>
                <tr>
                    <td align="center">
                        <table border="0" style="width: 100%">
                            <tbody>
                                <tr style="background-color: #fff;">
                                    <td align="left" height="auto" style="padding: 15px;" width="100%">
                                        <table style="width: 100%">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h2>
                                                            Elite
                                                        </h2>
                                                        <p style="margin: 4px 0;">
                                                            {!! $content !!}
                                                        </p>
                                                        <h3
                                                            style="font-size: 13px; margin: 20px 0 0 0; border-bottom: 1px solid #ddd; text-transform: uppercase; color: #f8ad0d;">
                                                            Order detail #{{ $data->id }}
                                                        </h3>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            style="background: #f5f5f5;" width="100%">
                                                            <thead>
                                                                <tr>
                                                                    <th align="center" bgcolor="#eaa414"
                                                                        style="padding: 10px 9px; color: #fff; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 14px;">
                                                                        .No</th>
                                                                    <th align="left" bgcolor="#eaa414"
                                                                        style="padding: 10px 9px; color: #fff; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 14px;">
                                                                        Image</th>
                                                                    <th align="left" bgcolor="#eaa414"
                                                                        style="padding: 10px 9px; color: #fff; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 14px;">
                                                                        Name</th>
                                                                    <th align="left" bgcolor="#eaa414"
                                                                        style="padding: 10px 9px; color: #fff; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 14px;">
                                                                        Properties</th>
                                                                    <th align="center" bgcolor="#eaa414"
                                                                        style="padding: 10px 9px; color: #fff; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 14px;">
                                                                        Price</th>
                                                                    <th align="right" bgcolor="#eaa414"
                                                                        style="padding: 10px 9px; color: #fff; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 14px;">
                                                                        Qty</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody bgcolor="#eee"
                                                                style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #444; line-height: 18px;">
                                                                @if ($data->orderDetail)
                                                                    @php
                                                                        $i = 1;
                                                                    @endphp
                                                                    @foreach ($data->orderDetail as $item)
                                                                        @php
                                                                            $properties = '';
                                                                        @endphp
                                                                        @foreach ($item->propertyValue as $value)
                                                                            @php
                                                                                $properties = $properties . $value->attribute_value_name . ', ';
                                                                            @endphp
                                                                        @endforeach

                                                                        @php $image = $item->product->image ?? "" @endphp
                                                                        <tr>
                                                                            <td align="center"
                                                                                style="padding: 3px 9px; vertical-align: middle;"
                                                                                valign="top">
                                                                                <span>{{ $i }}</span>
                                                                            </td>
                                                                            <td align="left"
                                                                                style="padding: 0; vertical-align: middle;">
                                                                                <div style="width: 50px; height: 50px;">
                                                                                    <img src="{{ asset($image) }}"
                                                                                        style="display: block; width: 100%;margin-left: auto; margin-right: auto;" />
                                                                                </div>
                                                                            </td>
                                                                            <td align="left"
                                                                                style="padding: 3px 9px; vertical-align: middle;"
                                                                                valign="top">
                                                                                <span>{{ $item->product->name }}</span>
                                                                            </td>
                                                                            <td align="left"
                                                                                style="padding: 3px 9px; vertical-align: middle;"
                                                                                valign="top">
                                                                                <span>{{ $properties }}</span>
                                                                            </td>
                                                                            <td align="center"
                                                                                style="padding: 3px 9px; vertical-align: middle;"
                                                                                valign="top">
                                                                                <span>{{ '$' . number_format($item->pivot->product_price) }}</span>
                                                                            </td>
                                                                            <td align="right"
                                                                                style="padding: 3px 9px; vertical-align: middle;"
                                                                                valign="top">{{ $item->pivot->qty }}
                                                                            </td>
                                                                        </tr>
                                                                        @php
                                                                            $i++;
                                                                        @endphp
                                                                    @endforeach
                                                                @endif
                                                            </tbody>
                                                            <tfoot
                                                                style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #444; line-height: 18px;">
                                                                <tr>
                                                                    <td align="right" colspan="5"
                                                                        style="padding: 5px 9px;">Subtotal
                                                                    </td>
                                                                    <td align="right" style="padding: 5px 9px;">
                                                                        {{ '$' . number_format($data->price + ($data->price_discount ?? 0)) }}</td>
                                                                </tr>

                                                                <tr>
                                                                    <td align="right" colspan="5"
                                                                        style="padding: 5px 9px;">Shipping
                                                                    </td>
                                                                    <td align="right" style="padding: 5px 9px;">
                                                                        <span><i>(0)</i></span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="right" colspan="5"
                                                                        style="padding: 5px 9px;">Discount
                                                                    </td>
                                                                    <td align="right" style="padding: 5px 9px;">
                                                                        <span>
                                                                            {{ '$' . number_format($data->price_discount ?? 0) }}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="right" colspan="5"
                                                                        style="padding: 7px 9px;">
                                                                        <strong>
                                                                            <big>Total Summary</big>
                                                                        </strong>
                                                                    </td>
                                                                    <td align="right" style="padding: 7px 9px;">
                                                                        <strong>
                                                                            <big>
                                                                                <span>($)
                                                                                    {{ number_format($data->price) }}</span>
                                                                            </big>
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </td>
                                                </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
